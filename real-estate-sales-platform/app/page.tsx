 "use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Home, MapPin, Menu, Search, ShieldCheck, SlidersHorizontal, Sparkles, X, MessageCircle, Building2, LandPlot, Globe2 } from "lucide-react";

type Property = {
  id: string; title: string; location: string; city: string; type: "Land" | "House";
  price: number; priceLabel: string; size: string; tag: string; image: string;
  description: string; status: string; slug: string;
  developer: string; sellerRole: string; documentation: string; paymentPlan: string; titleType: string; estate: string; bedrooms?: number; bathrooms?: number; features: string[];
};

const initialProperties: Property[] = [
  { id: "sample-1", title: "Residential Land Opportunity", location: "Moniya, Ibadan, Oyo State", city: "Ibadan", type: "Land", price: 3500000, priceLabel: "₦3.5m", size: "600 sqm", tag: "Ibadan", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85", description: "Sample listing for layout preview only. Replace with a verified property, confirmed price, documentation details and approved photographs before publishing.", status: "Sample listing", slug: "residential-land-moniya-ibadan", developer: "Example developer — replace before publishing", sellerRole: "Authorized sales representative to be confirmed", documentation: "Not verified — request and independently verify documents", paymentPlan: "To be confirmed with the developer", titleType: "To be verified", estate: "Estate name to be confirmed", features: ["Sample size: 600 sqm", "Confirm survey plan", "Confirm allocation and title documents"] },
  { id: "sample-2", title: "Land for Residential Development", location: "Epe, Lagos State", city: "Lagos", type: "Land", price: 5000000, priceLabel: "₦5m", size: "500 sqm", tag: "Lagos", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85", description: "Sample listing for layout preview only. Verify the estate, title, exact location, price and payment plan before using this as an advert.", status: "Sample listing", slug: "residential-land-epe-lagos", developer: "Example developer — replace before publishing", sellerRole: "Authorized sales representative to be confirmed", documentation: "Not verified — request and independently verify documents", paymentPlan: "To be confirmed with the developer", titleType: "To be verified", estate: "Estate name to be confirmed", features: ["Sample size: 500 sqm", "Confirm survey plan", "Confirm allocation and title documents"] },
  { id: "sample-3", title: "Modern Family Home", location: "Ibadan, Oyo State", city: "Ibadan", type: "House", price: 45000000, priceLabel: "₦45m", size: "3 bedrooms", tag: "Homes", image: "https://images.unsplash.com/photo-1600595047985-cc8c7a8c4f45?auto=format&fit=crop&w=1200&q=85", description: "Sample house card to demonstrate the design. Replace the copy, images and price with an authorized, currently available property.", status: "Sample listing", slug: "modern-family-home-ibadan", developer: "Example developer — replace before publishing", sellerRole: "Authorized sales representative to be confirmed", documentation: "Not verified — request and independently verify documents", paymentPlan: "To be confirmed with the developer", titleType: "To be verified", estate: "Estate name to be confirmed", bedrooms: 3, bathrooms: 3, features: ["3 bedrooms (sample)", "Confirm building condition", "Confirm title and completion status"] },
  { id: "sample-4", title: "Contemporary Lagos Residence", location: "Lagos, Lagos State", city: "Lagos", type: "House", price: 85000000, priceLabel: "₦85m", size: "4 bedrooms", tag: "Premium", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85", description: "Sample listing for preview only. Do not market this property until its details and availability have been verified.", status: "Sample listing", slug: "contemporary-lagos-residence", developer: "Example developer — replace before publishing", sellerRole: "Authorized sales representative to be confirmed", documentation: "Not verified — request and independently verify documents", paymentPlan: "To be confirmed with the developer", titleType: "To be verified", estate: "Estate name to be confirmed", bedrooms: 4, bathrooms: 4, features: ["4 bedrooms (sample)", "Confirm parking and utilities", "Confirm title and completion status"] }
];

function formatNaira(value: string) {
  return value.trim();
}

export default function HomePage() {
  const [properties] = useState(initialProperties);
  const [searchText, setSearchText] = useState("");
  const [city, setCity] = useState("All locations");
  const [type, setType] = useState("Any property");
  const [budget, setBudget] = useState("Any budget");
  const [selected, setSelected] = useState<Property | null>(null);
  const [leadSent, setLeadSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", budget: "", timeline: "Within 3 months", notes: "" });

  const filtered = useMemo(() => properties.filter((p) => {
    const q = searchText.toLowerCase().trim();
    const textMatch = !q || `${p.title} ${p.location} ${p.city} ${p.type}`.toLowerCase().includes(q);
    const cityMatch = city === "All locations" || p.city === city;
    const typeMatch = type === "Any property" || p.type === type;
    const budgetMatch = budget === "Any budget" || (budget === "Under ₦10m" && p.price < 10000000) || (budget === "₦10m–₦50m" && p.price >= 10000000 && p.price <= 50000000) || (budget === "Above ₦50m" && p.price > 50000000);
    return textMatch && cityMatch && typeMatch && budgetMatch;
  }), [properties, searchText, city, type, budget]);

  function submitLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = `Hello, I am interested in ${selected?.title || "finding a property"}.
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}
Budget: ${form.budget || "Not specified"}
Timeline: ${form.timeline}
Notes: ${form.notes || "None"}`;
    // Demo contact route: replace with your verified business WhatsApp number before launch.
    const whatsappNumber = "";
    if (!whatsappNumber) {
      const blob = new Blob([JSON.stringify({ ...form, property: selected?.title || "General enquiry", createdAt: new Date().toISOString(), demoMode: true }, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "property-enquiry-demo.json";
      link.click();
      URL.revokeObjectURL(link.href);
      setLeadSent(true);
      return;
    }
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setLeadSent(true);
  }

  return (
    <main>
      <div className="announcement"><span className="announcement-dot" /> Personal property guidance for buyers in Nigeria and the diaspora <span className="announcement-arrow">↗</span></div>
      <header className="header container">
        <a className="brand" href="#" aria-label="Realtor Adedayo home"><span className="brand-mark rad-mark">RAD</span><span>REALTOR <span className="brand-light">ADEDAYO</span><small>LAND · HOMES · INVESTMENT</small></span></a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#properties" onClick={() => setMenuOpen(false)}>Explore properties</a>
          <a href="#locations" onClick={() => setMenuOpen(false)}>Locations</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#diaspora" onClick={() => setMenuOpen(false)}>Diaspora buyers</a>
        </nav>
        <a className="header-cta" href="#contact">Talk to me <ArrowRight size={16}/></a>
      </header>

      <section className="hero">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="eyebrow"><span className="eyebrow-line"/> PROPERTY SEARCH, MADE PERSONAL</div>
          <h1>Find the right place<br/>to <em>build your future.</em></h1>
          <p className="hero-copy">Explore land and homes across Ibadan, Lagos and selected locations in Nigeria—with clear information and personal guidance at every step.</p>
          <div className="hero-actions"><a href="#properties" className="button button-light">Explore properties <ArrowRight size={17}/></a><a href="#process" className="text-link light-link">How buying works <span>↗</span></a></div>
          <div className="hero-proof"><div className="proof-icon"><ShieldCheck size={18}/></div><div><strong>Make informed property decisions</strong><span>Ask questions. Verify details. Move with clarity.</span></div></div>
        </div>
        <div className="hero-side-note"><span>01 / PROPERTY DISCOVERY</span><span className="side-line"/></div>
      </section>

      <section className="search-wrap container">
        <div className="search-heading"><div><span className="section-kicker">START YOUR SEARCH</span><h2>What are you looking for?</h2></div><span className="search-caption">A better search starts with the right details.</span></div>
        <div className="search-panel">
          <label className="search-main"><Search size={20}/><input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search location or property..." aria-label="Search location or property"/></label>
          <label><span>Location</span><select value={city} onChange={e => setCity(e.target.value)}><option>All locations</option><option>Ibadan</option><option>Lagos</option></select><ChevronDown size={15}/></label>
          <label><span>Property type</span><select value={type} onChange={e => setType(e.target.value)}><option>Any property</option><option>Land</option><option>House</option></select><ChevronDown size={15}/></label>
          <label><span>Budget</span><select value={budget} onChange={e => setBudget(e.target.value)}><option>Any budget</option><option>Under ₦10m</option><option>₦10m–₦50m</option><option>Above ₦50m</option></select><ChevronDown size={15}/></label>
          <a href="#properties" className="button button-dark"><Search size={17}/> Find properties</a>
        </div>
      </section>

      <section id="properties" className="section container">
        <div className="section-top"><div><span className="section-kicker">THE PROPERTY COLLECTION</span><h2>Find a place that fits <em>your plans.</em></h2><p className="section-description">Explore a range of land and homes. Ask for current availability and the details that matter to you.</p></div><a href="#contact" className="text-link">Need help choosing? <ArrowRight size={16}/></a></div>
        <div className="results-bar"><span><strong>{filtered.length.toString().padStart(2, "0")}</strong> properties shown</span><span className="results-demo"><span/> Preview inventory — sample listings</span></div>
        <div className="property-grid">
          {filtered.map((p, i) => <article className="property-card" key={p.id}>
            <button className="property-image-button" onClick={() => { setSelected(p); setLeadSent(false); }} aria-label={`View ${p.title}`}><img src={p.image} alt="Property landscape preview" className="property-image"/><span className="property-tag">{p.tag}</span><span className="image-arrow"><ArrowRight size={18}/></span></button>
            <div className="property-body"><div className="property-type"><span>{p.type === "Land" ? <LandPlot size={14}/> : <Home size={14}/>} {p.type}</span><span className="sample-label">SAMPLE</span></div><h3>{p.title}</h3><div className="property-location"><MapPin size={15}/>{p.location}</div><div className="property-footer"><div><span className="price-label">Illustrative price</span><strong className="property-price">{p.priceLabel}</strong></div><span className="property-size">{p.size}</span></div><button className="details-link" onClick={() => { setSelected(p); setLeadSent(false); }}>View details <ArrowRight size={16}/></button></div>
          </article>)}
          {filtered.length === 0 && <div className="empty-state"><Search size={25}/><h3>No matching sample listings</h3><p>Try changing your search or contact me to discuss what you need.</p><button className="button button-dark" onClick={() => { setSearchText(""); setCity("All locations"); setType("Any property"); setBudget("Any budget"); }}>Reset filters</button></div>}
        </div>
        <p className="inventory-note"><ShieldCheck size={16}/> <span><strong>Before you make a decision:</strong> all sample listings must be replaced with real, authorized inventory. Always independently verify title documents, approvals, seller authority, total fees, and availability before paying.</span></p>
      </section>

      <section id="locations" className="locations-section">
        <div className="container"><div className="section-top light-top"><div><span className="section-kicker">SEARCH BY LOCATION</span><h2>Start where your <em>plans take you.</em></h2><p className="section-description">Focus your search on the locations that suit your budget, lifestyle, or investment goals.</p></div></div>
          <div className="location-grid">
            <button className="location-card location-ibadan" onClick={() => { setCity("Ibadan"); document.getElementById("properties")?.scrollIntoView({behavior:"smooth"}); }}><span className="location-number">01 / OYO STATE</span><span className="location-title">Ibadan</span><span className="location-sub">Land & residential homes</span><span className="location-cta">Explore Ibadan <ArrowRight size={17}/></span></button>
            <button className="location-card location-lagos" onClick={() => { setCity("Lagos"); document.getElementById("properties")?.scrollIntoView({behavior:"smooth"}); }}><span className="location-number">02 / LAGOS STATE</span><span className="location-title">Lagos</span><span className="location-sub">Land, homes & opportunities</span><span className="location-cta">Explore Lagos <ArrowRight size={17}/></span></button>
            <a href="#diaspora" className="location-card location-diaspora"><span className="location-number">03 / BUY FROM ABROAD</span><span className="location-title">The diaspora</span><span className="location-sub">A clearer path to buying in Nigeria</span><span className="location-cta">Learn the process <ArrowRight size={17}/></span></a>
          </div>
        </div>
      </section>

      <section id="process" className="section container process-section">
        <div className="process-intro"><span className="section-kicker">A CLEARER BUYING JOURNEY</span><h2>From first question<br/>to <em>next steps.</em></h2><p className="section-description">Buying property is a major decision. You deserve clear answers, a transparent process, and time to verify what you are buying.</p><a href="#contact" className="button button-dark">Start a conversation <ArrowRight size={17}/></a></div>
        <div className="process-steps">
          <div className="process-step"><span className="step-number">01</span><div><h3>Share what you need</h3><p>Tell me your preferred location, property type, budget, and timeline.</p></div><Search size={21}/></div>
          <div className="process-step"><span className="step-number">02</span><div><h3>Review suitable options</h3><p>Compare relevant listings, ask questions, and request current property details.</p></div><SlidersHorizontal size={21}/></div>
          <div className="process-step"><span className="step-number">03</span><div><h3>Verify before committing</h3><p>Confirm availability and have the title, approvals, seller authority, and terms independently checked.</p></div><ShieldCheck size={21}/></div>
          <div className="process-step"><span className="step-number">04</span><div><h3>Agree on the next step</h3><p>Request a viewing or consultation. Appointments are confirmed only after both sides agree.</p></div><CheckCircle2 size={21}/></div>
        </div>
      </section>

      <section id="diaspora" className="diaspora-section"><div className="container diaspora-content"><div className="diaspora-icon"><Globe2 size={26}/></div><div><span className="section-kicker">FOR NIGERIANS ABROAD</span><h2>Buying from abroad?<br/><em>Stay informed at every step.</em></h2><p>Ask for a clear breakdown of the property, documentation to review, payment terms, and the verification steps you should complete before sending money.</p><a className="button button-light" href="#contact">Discuss your property goals <ArrowRight size={17}/></a></div><div className="diaspora-stamp"><span>CLARITY</span><span>BEFORE</span><span>COMMITMENT</span></div></div></section>

      <section id="contact" className="contact-section container"><div className="contact-copy"><span className="section-kicker">LET'S TALK PROPERTY</span><h2>Tell me what<br/>you're <em>looking for.</em></h2><p>Share a few details and start a conversation about your property search. No pressure to make a decision before you're ready.</p><div className="contact-assurance"><CheckCircle2 size={18}/><span>Your information should only be used to respond to your enquiry. Production privacy and storage settings must be configured before launch.</span></div></div>
        <form className="contact-form" onSubmit={submitLead}><div className="form-heading"><span>PROPERTY ENQUIRY</span><Sparkles size={18}/></div>{leadSent ? <div className="success-panel"><CheckCircle2 size={28}/><h3>Enquiry demo prepared</h3><p>A sample JSON file was downloaded to demonstrate form handling. This preview is not yet connected to a live CRM, email, or n8n workflow.</p><button className="button button-dark" type="button" onClick={() => { setLeadSent(false); setForm({name:"",phone:"",email:"",budget:"",timeline:"Within 3 months",notes:""}); }}>Send another enquiry</button></div> : <><div className="form-row"><label>Full name<input required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Your name"/></label><label>Phone / WhatsApp<input required value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="+234..."/></label></div><label>Email address <span className="optional">(optional)</span><input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label><div className="form-row"><label>Budget range<input value={form.budget} onChange={e => setForm({...form,budget:e.target.value})} placeholder="e.g. ₦5m–₦10m"/></label><label>Buying timeline<select value={form.timeline} onChange={e => setForm({...form,timeline:e.target.value})}><option>Within 3 months</option><option>Within 6 months</option><option>More than 6 months</option><option>Just researching</option></select></label></div><label>What are you looking for?<textarea rows={3} value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} placeholder="Preferred area, land or house, questions..."/></label><label className="consent"><input type="checkbox" required/> <span>I agree to be contacted about this enquiry and understand I can ask for follow-up to stop.</span></label><button type="submit" className="button button-dark form-submit">Prepare enquiry <ArrowRight size={17}/></button><p className="form-legal">Preview only: live lead storage, privacy policy, notifications, and anti-spam protection must be configured before public launch.</p></>}</form>
      </section>

      <footer className="footer"><div className="container footer-main"><a className="brand brand-footer" href="#"><span className="brand-mark rad-mark">RAD</span><span>REALTOR <span className="brand-light">ADEDAYO</span><small>LAND · HOMES · INVESTMENT</small></span></a><p>Property decisions deserve clear information, careful verification, and a personal approach.</p><div className="footer-links"><a href="#properties">Properties</a><a href="#process">How it works</a><a href="#contact">Contact</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Realtor Adedayo (RAD).</span><span>Verify property information independently before payment.</span></div></footer>

      {selected && <div className="modal-backdrop" role="presentation" onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}><div className="property-modal" role="dialog" aria-modal="true" aria-label={selected.title}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details"><X/></button><img src={selected.image} alt="Property preview" className="modal-image"/><div className="modal-content"><span className="section-kicker">{selected.type} · {selected.city.toUpperCase()} · SAMPLE</span><h2>{selected.title}</h2><div className="property-location"><MapPin size={15}/>{selected.location}</div><div className="modal-price">{selected.priceLabel} <span>illustrative only</span></div><p>{selected.description}</p>
          <h3 className="detail-heading">Property details</h3><div className="detail-grid">
            <div><span>Property type</span><strong>{selected.type}</strong></div><div><span>Size / layout</span><strong>{selected.size}</strong></div>
            <div><span>Estate / project</span><strong>{selected.estate}</strong></div><div><span>Title / tenure</span><strong>{selected.titleType}</strong></div>
            <div><span>Documentation</span><strong>{selected.documentation}</strong></div><div><span>Payment plan</span><strong>{selected.paymentPlan}</strong></div>
            {selected.bedrooms && <div><span>Bedrooms</span><strong>{selected.bedrooms}</strong></div>}{selected.bathrooms && <div><span>Bathrooms</span><strong>{selected.bathrooms}</strong></div>}
          </div><h3 className="detail-heading">Developer / authorized seller</h3><div className="developer-panel"><Building2 size={20}/><div><strong>{selected.developer}</strong><p>{selected.sellerRole}</p><small>Before publishing, add the developer’s verified name, company profile, contact details and proof of authorization.</small></div></div>
          <h3 className="detail-heading">Key points to confirm</h3><ul className="detail-features">{selected.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <div className="modal-warning"><ShieldCheck size={17}/> Sample data only. Independently verify availability, developer authorization, title documents, price and payment terms before making any payment.</div><button className="button button-dark modal-action" onClick={() => { setSelected(null); document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}); setForm({...form,notes:`I am interested in: ${selected.title} (${selected.location}).`}); }}>Enquire about this property <ArrowRight size={17}/></button></div></div></div>}
    </main>
  );
}
