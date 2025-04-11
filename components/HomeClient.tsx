"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

import SidebarFilters from "@/components/SidebarFilters";
import SearchBox from "@/components/SearchBox";
import FormCard from "@/components/FormCard";

type FormItem = {
  titlu: string;
  descriere: string;
  categorie: string;
  judet: string;
  institutie: string;
  popularitate?: number;
  links?: { link: string; format: string; titlu: string; data_actualizare?: string }[];
};

export default function HomeClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("q") || "");
  const [forms, setForms] = useState<FormItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    judet: params.get("judet") || "all",
    categorie: params.get("categorie") || "all",
    institutie: params.get("institutie") || "all",
    tip: params.get("tip") || "all",
    format: params.get("format") || "all",
  });

  useEffect(() => {
    fetch("/formulare.json")
      .then((res) => res.json())
      .then((data) => setForms(data));
  }, []);

  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.set("q", search);
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== "all") query.set(k, v);
    });
    router.replace(query.toString() ? `/?${query.toString()}` : "/");
  }, [search, filters, router]);

  const resetFilters = () => {
    setSearch("");
    setFilters({ judet: "all", categorie: "all", institutie: "all", tip: "all", format: "all" });
  };

  type FilterField = keyof typeof filters;
  const updateFilter = (field: FilterField, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

  const filteredForms = forms
    .filter((form) => {
      const query = normalize(search);
      const judetFilter = normalize(filters.judet);
      const categorieFilter = normalize(filters.categorie);
      const institutieFilter = normalize(filters.institutie);
      const tipFilter = normalize(filters.tip);
      const formatFilter = filters.format;

      return (
        (normalize(form.titlu).includes(query) ||
          normalize(form.descriere).includes(query) ||
          normalize(form.categorie).includes(query) ||
          normalize(form.judet).includes(query)) &&
        (filters.judet === "all" || normalize(form.judet) === judetFilter || normalize(form.judet) === "național") &&
        (filters.categorie === "all" || normalize(form.categorie) === categorieFilter) &&
        (filters.institutie === "all" || (form.institutie && normalize(form.institutie).includes(institutieFilter))) &&
        (filters.tip === "all" || (form.titlu && normalize(form.titlu).includes(tipFilter))) &&
        (filters.format === "all" || form.links?.some((l) => l.format === formatFilter))
      );
    })
    .sort((a, b) => (b.popularitate || 0) - (a.popularitate || 0));

  const categoriiUnice = [...new Set(forms.map((f) => f.categorie))];
  const judeteUnice = [...new Set(forms.map((f) => f.judet))];
  const institutiiUnice = [...new Set(forms.map((f) => f.institutie))];
  const formateUnice = [".pdf", ".docx"];
  const tipuriFormulare = ["cerere", "contract", "declarație"];

  return (
    <main className="flex">
      <SidebarFilters
        filters={filters}
        options={{ categoriiUnice, judeteUnice, institutiiUnice, tipuriFormulare, formateUnice }}
        onChange={updateFilter}
        onReset={resetFilters}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Catalog formulare</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        <SearchBox value={search} onChange={setSearch} />

        <p className="text-sm text-muted-foreground mb-4">
          {filteredForms.length} rezultate găsite
        </p>

        {search === "" &&
          filters.judet === "all" &&
          filters.categorie === "all" &&
          filters.institutie === "all" &&
          filters.tip === "all" &&
          filters.format === "all" && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Formulare recomandate</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forms.slice(0, 6).map((form, idx) => (
                  <FormCard key={`rec-${idx}`} form={form} />
                ))}
              </div>
            </div>
          )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredForms.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-10">
              <p className="text-lg font-medium">Niciun formular găsit</p>
              <p className="text-sm">Încearcă să ajustezi filtrele sau să reformulezi căutarea.</p>
            </div>
          ) : (
            filteredForms.map((form, idx) => <FormCard key={idx} form={form} />)
          )}
        </section>
      </div>
    </main>
  );
}
