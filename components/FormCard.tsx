import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FormCardProps {
  form: {
    titlu: string;
    descriere: string;
    categorie: string;
    judet: string;
    institutie: string;
    links?: { link: string; format: string; titlu: string; data_actualizare?: string }[];
    link?: string;
    popularitate?: number;
  };
  highlight?: boolean;
}

const isRecent = (dateStr?: string) => {
  if (!dateStr) return false;
  const updated = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - updated.getTime();
  return diff < 1000 * 60 * 60 * 24 * 90;
};

export default function FormCard({ form, highlight = false }: FormCardProps) {
  const links = form.links || (form.link ? [{ link: form.link, format: "pdf", titlu: form.titlu }] : []);

  return (
    <Card className="hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold mb-2">{form.titlu}</h2>
          {highlight && form.popularitate !== undefined && (
            <span className="text-xs text-yellow-700 ml-2">⭐ {form.popularitate}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-2">{form.descriere}</p>
        <p className="text-xs text-muted-foreground mb-1">
          {form.categorie} • {form.judet}
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          {form.institutie}
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="descarca">
            <AccordionTrigger className="text-sm font-medium">Fișiere disponibile ({links.length})</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pt-2">
                {links.map((doc, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4">
                    <div>
                      <p className="text-sm">
                        {doc.titlu} <span className="text-xs text-muted-foreground">({doc.format.toUpperCase()})</span>
                      </p>
                      {doc.data_actualizare && (
                        <p className="text-xs text-muted-foreground">
                          Ultima actualizare: {doc.data_actualizare}
                          {isRecent(doc.data_actualizare) && (
                            <span className="ml-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">Nou</span>
                          )}
                        </p>
                      )}
                    </div>
                    <a href={doc.link} download>
                      <Button variant="outline" size="sm">Descarcă</Button>
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}