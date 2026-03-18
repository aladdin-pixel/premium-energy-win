import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, Globe, Clock, Users, RefreshCw, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface EmailSubmission {
  id: string;
  email: string;
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
  source: string | null;
  country_code: string;
  country_name: string;
  flag: string;
}

const Dashboard = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("dashboard_auth") === "1");
  const [submissions, setSubmissions] = useState<EmailSubmission[]>([]);
  const [filtered, setFiltered] = useState<EmailSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const { data, error: fnError } = await supabase.functions.invoke(
        "get-email-submissions"
      );
      if (fnError) throw fnError;
      if (data?.success) {
        setSubmissions(data.data || []);
        setError("");
      } else {
        setError("Failed to load submissions");
      }
    } catch (e: any) {
      console.error(e);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(submissions);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        submissions.filter(
          (s) =>
          s.email.toLowerCase().includes(q) ||
          s.ip_address?.toLowerCase().includes(q) ||
          s.country_name?.toLowerCase().includes(q) ||
          s.country_code?.toLowerCase().includes(q)
        )
      );
    }
  }, [search, submissions]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Count unique countries
  const countryStats = submissions.reduce<Record<string, {count: number;flag: string;name: string;}>>((acc, s) => {
    if (s.country_code) {
      if (!acc[s.country_code]) {
        acc[s.country_code] = { count: 0, flag: s.flag, name: s.country_name };
      }
      acc[s.country_code].count++;
    }
    return acc;
  }, {});

  const topCountries = Object.entries(countryStats).
  sort((a, b) => b[1].count - a[1].count).
  slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Email Signups  </h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-foreground disabled:opacity-50">
            
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Users className="w-5 h-5 text-primary" />}
            label="Total Signups"
            value={submissions.length} />
          
          <StatCard
            icon={<Globe className="w-5 h-5 text-accent" />}
            label="Countries"
            value={Object.keys(countryStats).length} />
          
          <StatCard
            icon={<Clock className="w-5 h-5 text-muted-foreground" />}
            label="Last 24h"
            value={
            submissions.filter(
              (s) =>
              new Date(s.created_at).getTime() >
              Date.now() - 24 * 60 * 60 * 1000
            ).length
            } />
          
          <StatCard
            icon={<Mail className="w-5 h-5 text-primary" />}
            label="Last 7 days"
            value={
            submissions.filter(
              (s) =>
              new Date(s.created_at).getTime() >
              Date.now() - 7 * 24 * 60 * 60 * 1000
            ).length
            } />
          
        </div>

        {/* Country Breakdown */}
        {topCountries.length > 0 &&
        <div className="glass rounded-xl p-4">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">
              Top Countries
            </h2>
            <div className="flex flex-wrap gap-3">
              {topCountries.map(([code, info]) =>
            <div
              key={code}
              className="flex items-center gap-2 bg-secondary/60 rounded-lg px-3 py-2">
              
                  <span className="text-lg">{info.flag}</span>
                  <span className="text-sm font-medium text-foreground">
                    {info.name}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                    {info.count}
                  </span>
                </div>
            )}
            </div>
          </div>
        }

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by email, IP, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          
        </div>

        {/* Table */}
        {loading ?
        <div className="text-center py-20 text-muted-foreground">
            Loading submissions...
          </div> :
        error ?
        <div className="text-center py-20 text-destructive">{error}</div> :

        <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      #
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      IP Address
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Source
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub, i) =>
                <tr
                  key={sub.id}
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  
                      <td className="py-3 px-4 text-muted-foreground tabular-nums">
                        {i + 1}
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground">
                        {sub.email}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {sub.flag &&
                      <span className="text-base leading-none">{sub.flag}</span>
                      }
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {sub.country_code || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground font-mono text-xs">
                        {sub.ip_address || "—"}
                      </td>
                      <td className="py-3 px-4">
                        {sub.source ?
                    <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                            {sub.source}
                          </span> :

                    <span className="text-muted-foreground">—</span>
                    }
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-xs whitespace-nowrap">
                        {formatDate(sub.created_at)}
                      </td>
                    </tr>
                )}
                  {filtered.length === 0 &&
                <tr>
                      <td
                    colSpan={6}
                    className="py-12 text-center text-muted-foreground">
                    
                        {search ? "No results found" : "No signups yet"}
                      </td>
                    </tr>
                }
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </div>);

};

const StatCard = ({
  icon,
  label,
  value




}: {icon: React.ReactNode;label: string;value: number;}) =>
<div className="glass rounded-xl p-4 flex flex-col gap-2">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <span className="text-2xl font-bold text-foreground tabular-nums">{value}</span>
  </div>;


export default Dashboard;