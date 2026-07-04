import { Section } from '../atoms/Section';
import { Eyebrow } from '../atoms/Eyebrow';
import { Accordion, type AccordionItem } from '../molecules/Accordion';
import { FAQS } from '../../data/landing';

const items: AccordionItem[] = FAQS.map((f) => ({
  title: f.question,
  content: f.answer,
}));

/** Frequently asked questions accordion. */
export function FAQ() {
  return (
    <Section id="faq">
      <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-balance font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl dark:text-white">
            Questions, <span className="italic text-primary">answered</span>.
          </h2>
          <p className="text-lg leading-relaxed text-muted">
            Everything you need to know about generating proposals with PitchIQ.
          </p>
        </div>

        <Accordion items={items} defaultOpen={0} allowMultiple />
      </div>
    </Section>
  );
}
