const topics = [
  {
    id: "baa",
    label: "BAA coverage",
    keywords: ["baa", "business associate agreement", "hipaa", "phi", "regulated workspace", "healthcare"],
    risk: "Legal review recommended",
    badge: "warn",
    sources: ["GTM FAQ: Business Associate Agreement", "GTM FAQ: Data Retention and ZDR/MAM"],
    customer: ({ customer, product }) => `Thanks for raising this. Short answer is that Sales needs to confirm the setup before saying the BAA applies here.

For ChatGPT Enterprise and Edu, BAA coverage generally requires a Regulated Workspace. For API, it depends on the approved ZDR or Modified Abuse Monitoring setup for the relevant org and eligible endpoints. Based on the information provided, Sales should confirm the exact service, workspace or org ID, and whether the required configuration is already approved and enabled before saying the BAA applies to ${product}.

OpenAI should not add a separate customer-specific BAA commitment to the order form unless the setup is confirmed and the language is approved. Customer should first confirm whether the applicable OpenAI BAA path works for Customer's intended use case. If Customer believes a reasonable change is needed, Customer can suggest a redline to the applicable OpenAI document through the normal Ironclad process.`,
    internal: ({ docs }) => `Check whether the request is about ChatGPT, API, Codex, connectors, alpha/beta, or an older BAA. Do not tell Customer that Codex, connectors, alpha/beta, or every workspace is covered unless Legal has confirmed the current product-specific position.

Documents flagged: ${docs || "none"}.`
  },
  {
    id: "zdr",
    label: "ZDR / MAM",
    keywords: ["zdr", "zero data", "mam", "modified abuse", "abuse monitoring", "safety classifier", "retention", "org id"],
    risk: "Send after setup check",
    badge: "warn",
    sources: ["GTM FAQ: Data Retention and ZDR/MAM"],
    customer: () => `Thanks for asking. Short answer: ZDR and Modified Abuse Monitoring are API-specific and should not be described as applying to ChatGPT workspaces.

For API, eligibility depends on Customer's use case, approved endpoints, and completion of the Zero Data Review process. The right path is to complete the ZDR/MAM intake, generate the applicable Ironclad agreement, and confirm the configuration is enabled for the correct API org before representing that ZDR or MAM applies.

If Customer is asking about a product, endpoint, or alpha/beta service outside the approved scope, Sales should ask Customer to identify the specific requirement they need covered. If Customer needs a contract change, Customer can suggest a reasonable redline to the applicable OpenAI document.`,
    internal: () => `Verify approval in the Zero Data Review process and the exact org ID. If Customer is connecting this to PHI, also check BAA requirements.`
  },
  {
    id: "data-residency",
    label: "Data residency",
    keywords: ["data residency", "residency", "resident", "processing location", "compute", "migration", "eu", "us only", "global"],
    risk: "Send with product caveat",
    badge: "good",
    sources: ["GTM FAQ: Data Residency"],
    customer: ({ product }) => `Yes, OpenAI offers data residency options for eligible services, but the path depends on the product and setup.

For ChatGPT, data residency is generally selected before a new workspace is created and documented through the order form/addendum path. Existing workspace migration is limited, so Sales should confirm the facts before committing to timing or a migration path.

For API, data residency is described in OpenAI's technical documentation and is available for eligible customers through the applicable configuration. A separate signed addendum is generally not required unless Legal approves an exception.

Customer should review OpenAI's available data residency documentation and determine whether the current offering works for Customer. If Customer needs a contractual change beyond the standard offering, Sales should ask Customer to identify the specific requirement and propose a reasonable redline to the applicable OpenAI document.`,
    internal: () => `If Customer claims OpenAI previously guaranteed US-only processing, do not concede a change. Check the contract and documentation history first.`
  },
  {
    id: "customer-paper",
    label: "Customer paper",
    keywords: ["customer paper", "their paper", "code of conduct", "procurement", "rfp", "rfx", "terms of participation", "sign their"],
    risk: "Likely needs Legal",
    badge: "warn",
    sources: ["GTM FAQ: Will OpenAI work from Customer paper?", "GTM FAQ: Can we agree to Customer Codes of Conduct?"],
    customer: () => `Thanks for sharing this. OpenAI's standard approach is to contract on OpenAI paper for OpenAI services, including the services agreement, data processing terms, security/privacy commitments, and related ordering documents.

Because OpenAI operates scaled, multi-tenant services, OpenAI generally cannot accept customer-specific operational, security, privacy, or code-of-conduct requirements outside OpenAI's standard terms.

Customer should review OpenAI's documents, Trust Portal materials, and public documentation and determine whether those materials work for Customer's requirements. If Customer believes a reasonable change is needed, Customer may suggest redlines to the applicable OpenAI documents.

Sales should not send customer paper for OpenAI to reconcile against OpenAI documents. The action item sits with Customer to review OpenAI's materials and identify any specific, reasonable requested changes.`,
    internal: () => `Customer paper, RfX terms, and vendor forms often contain service-governing terms. Sales should redirect Customer to OpenAI paper and ask Customer to identify any specific reasonable redlines.`
  },
  {
    id: "vendor-questionnaire",
    label: "Vendor questionnaire",
    keywords: ["vendor questionnaire", "customer questionnaire", "security questionnaire", "privacy questionnaire", "procurement questionnaire", "onboarding questionnaire", "supplier questionnaire", "vendor form", "vendor onboarding", "supplier onboarding", "supplier form"],
    risk: "Route to source owner",
    badge: "good",
    sources: ["GTM FAQ: proposed routing addition", "Trust Portal", "Security and privacy documentation"],
    customer: () => `Thanks for sending this. OpenAI can respond to reasonable vendor onboarding questions, but Customer should first review OpenAI's standard materials, Trust Portal content, and public documentation because many security, privacy, subprocessors, product, and company-information questions are already answered there.

Sales should ask Customer to identify the specific unanswered questions after reviewing those materials. For questionnaire fields that require factual product, security, privacy, finance, or tax information, Sales should route each field to the appropriate internal source owner rather than asking Legal to complete the questionnaire end to end.

If any questionnaire response would create a new contractual commitment, change OpenAI's standard terms, or accept customer-specific operating obligations, Customer may propose a reasonable redline to the applicable OpenAI document for review. OpenAI should not treat a questionnaire response as an amendment to the governing agreement unless the change is approved through the normal contracting process.`,
    internal: () => `Use this for vendor onboarding questionnaires and supplier forms that request factual information. Route factual fields to the source owner. Escalate only fields that create contract commitments, legal certifications, or non-standard obligations.`
  },
  {
    id: "agreement-governing",
    label: "Which agreement governs",
    keywords: ["govern", "existing agreement", "existing ea", "msa", "affiliate", "acquired", "subsidiary", "carry over", "reference", "incorporated", "rip and replace"],
    risk: "Needs document check",
    badge: "warn",
    sources: ["GTM FAQ: Map of GTM documents", "GTM FAQ: Order Form", "GTM FAQ: OpenAI Services Agreement"],
    customer: ({ customer }) => `Thanks for raising this. Short answer is that Sales should check the documents before confirming.

Whether an existing agreement applies depends on the parties, the services, and the governing-agreement language in the relevant order form or amendment. Before confirming that prior terms apply to ${customer || "Customer"}'s new purchase, affiliate, workspace, or product, Sales should check the signed agreement, the order form references, and whether the entity receiving the service is covered.

Sales should confirm the Customer entity, product, and order form path before telling Customer that prior terms apply. If Customer wants prior terms to govern a new purchase, Customer should identify the agreement Customer believes applies and Sales should make sure the order form is configured to reference the correct governing document. If the documents do not line up, Customer may propose a reasonable redline or amendment path.`,
    internal: () => `Review party names, affiliate language, product scope, order form governing terms, DPA/BAA references, and whether a new OF is needed.`
  },
  {
    id: "order-form-fix",
    label: "Order form fix",
    keywords: ["wrong signer", "signatory", "countersign", "counter sign", "docusign", "signature packet", "vat", "entity", "address", "start date", "cancel", "void", "resend", "archived"],
    risk: "Operational plus Legal",
    badge: "good",
    sources: ["GTM FAQ: Ironclad", "GTM FAQ: Order Form"],
    customer: () => `Thanks for flagging. Sales should clean this up in the contracting system so the executed record matches the parties' intent and OpenAI's internal approval process.

If the issue is administrative, such as signer, entity details, address, VAT, or signature packet handling, Sales may be able to correct it through Ironclad or by canceling and issuing a corrected order form.

If the document has already been signed or countersigned, please do not make informal edits to the signed copy. Sales should work through the contracting system to cancel/reissue, correct the workflow, or request the appropriate amendment path.`,
    internal: () => `For signed documents, prefer cancel/reissue or amendment over manual edits. Confirm whether Deal Desk, Billing Ops, or Legal owns the correction.`
  },
  {
    id: "commercial-terms",
    label: "Custom commercial terms",
    keywords: ["price cap", "renewal cap", "discount", "shortfall", "commitment", "draw down", "payment terms", "monthly billing", "sla", "latency", "no publicity", "strategic intent"],
    risk: "Deal Desk and Legal",
    badge: "warn",
    sources: ["GTM FAQ: What are reasonable Customer redlines?", "GTM FAQ: Service Level agreement"],
    customer: () => `Thanks for the request. Sales should line this up with Deal Desk first.

Commercial changes such as pricing protections, payment schedules, commitment drawdown, shortfall relief, SLA commitments, publicity restrictions, or strategic-intent language need to align with OpenAI's approved deal structure.

Sales should first get Deal Desk approval for the business point. Once approved, Customer or Sales can propose specific language for the order form through the normal contracting process. Sales should not ask Legal to draft the business term from scratch.`,
    internal: () => `Ask for Deal Desk approval link, exact requested language, deal size, and whether precedent exists.`
  },
  {
    id: "nda",
    label: "NDA edge case",
    keywords: ["nda", "mnda", "confidential", "tripartite", "three-party", "co-development", "roadmap", "partner", "si", "assignment", "novation"],
    risk: "Send with scope caveat",
    badge: "good",
    sources: ["NDA FAQ: Quick Start", "NDA FAQ: Track 2", "NDA FAQ: Track 3"],
    customer: () => `OpenAI's standard NDA is designed to cover the exchange of confidential information for evaluating and potentially entering a business relationship.

It does not, by itself, allocate IP ownership, authorize co-development, set product commitments, or replace service-specific agreements like a DPA, BAA, or order form.

Sales should confirm who will receive confidential information, which entity the recipient represents, and whether the recipient is covered by an existing NDA before sharing. If Customer wants a different confidentiality structure, Customer may propose a reasonable redline to OpenAI's NDA or request a three-party NDA path.`,
    internal: () => `Check NDA entity, purpose, active term, recipients, and whether the ask is really about IP, product work, or data processing rather than confidentiality.`
  },
  {
    id: "coi",
    label: "COI / insurance",
    keywords: ["coi", "insurance", "certificate of insurance", "additional insured", "waiver of subrogation"],
    risk: "Route before sending",
    badge: "warn",
    sources: ["GTM FAQ: proposed routing addition"],
    customer: () => `Thanks for the request. Sales should route this to the right owner before sending anything, because standard company and insurance materials come from different approved sources.

Customer should identify the exact document Customer needs and whether a standard OpenAI document is sufficient. If Customer requires custom certificate holder language, additional insured language, tax information, or legal signature, Sales should route that specific request to the correct internal owner rather than asking Legal to generally review the Customer packet.`,
    internal: () => `Route COI and insurance customizations to the insurance owner/Billing Ops path; legal entity, tax, beneficial ownership, and certificates may require Finance/Tax/Legal.`
  },
  {
    id: "alpha",
    label: "Alpha / beta",
    keywords: ["alpha", "beta", "early access", "evaluation", "pilot", "eval agreement", "preview"],
    risk: "Legal/Product check",
    badge: "warn",
    sources: ["GTM FAQ: Alpha Agreements"],
    customer: () => `Alpha, beta, early-access, and evaluation services are made available for testing before general release and are typically subject to evaluation-specific terms.

Those terms may differ from the protections that apply to generally available services. If Customer needs production-level commitments, BAA coverage, ZDR/MAM, service levels, or other heightened obligations for an alpha or beta service, Customer should identify the specific requirement and Sales should route that request to Legal and Product before agreeing.

If those requirements are essential, Customer should determine whether the evaluation terms work for Customer. If not, Customer can decline the alpha/beta program, wait for the generally available service, or propose a specific reasonable redline to the applicable OpenAI document.`,
    internal: () => `Do not assume alpha/beta is covered by BAA, ZDR, SLA, IP indemnity, or production commitments.`
  }
];

const fallbackTopic = {
  label: "General legal intake",
  risk: "Needs triage",
  badge: "neutral",
  sources: ["GTM FAQ: How we work together"],
  customer: ({ customer, product }) => `Thanks for raising this. More context is needed before providing language for Customer.

Sales should confirm Customer's exact ask, the agreement or order form involved, and whether Customer is asking for clarification only or for a change to OpenAI's terms. Customer should review OpenAI's documents first and identify any specific reasonable redlines Customer wants OpenAI to consider.

For now, Sales should not send a substantive answer to ${customer || "Customer"} on the ${product} opportunity until those facts are confirmed.`,
  internal: () => `The question did not strongly match a supported topic. Ask for Customer ask, document path, deal size, product, and deadline.`
};

const questionInput = document.querySelector("#questionInput");
const customerInput = document.querySelector("#customerInput");
const dealSizeInput = document.querySelector("#dealSizeInput");
const productInput = document.querySelector("#productInput");
const audienceInput = document.querySelector("#audienceInput");
const notesInput = document.querySelector("#notesInput");
const customerOutput = document.querySelector("#customerOutput");
const internalOutput = document.querySelector("#internalOutput");
const topicSignal = document.querySelector("#topicSignal strong");
const riskSignal = document.querySelector("#riskSignal strong");
const confidenceBadge = document.querySelector("#confidenceBadge");
const statusPill = document.querySelector("#statusPill");
const topicChips = document.querySelector("#topicChips");

function getCheckedDocs() {
  return [...document.querySelectorAll(".checkbox-grid input:checked")]
    .map((item) => item.value)
    .join(", ");
}

function context() {
  return {
    question: questionInput.value.trim(),
    customer: customerInput.value.trim(),
    dealSize: dealSizeInput.value.trim(),
    product: productInput.value,
    audience: audienceInput.value,
    notes: notesInput.value.trim(),
    docs: getCheckedDocs()
  };
}

function keywordMatches(text, keyword) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (keyword.includes(" ")) {
    return new RegExp(`\\b${escaped}\\b`, "i").test(text);
  }
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

function scoreTopic(text, topic) {
  return topic.keywords.reduce((score, keyword) => {
    if (!keywordMatches(text, keyword)) return score;
    return score + (keyword.includes(" ") ? 3 : 1);
  }, 0);
}

function detectTopic(text) {
  const normalized = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  let tied = false;

  for (const topic of topics) {
    const score = scoreTopic(normalized, topic);

    if (score > bestScore) {
      best = topic;
      bestScore = score;
      tied = false;
    } else if (score > 0 && score === bestScore) {
      tied = true;
    }
  }

  return best && !tied ? best : fallbackTopic;
}

function setBadge(topic) {
  confidenceBadge.className = `badge ${topic.badge}`;
  if (topic.badge === "good") confidenceBadge.textContent = "Usable draft";
  else if (topic.badge === "warn") confidenceBadge.textContent = "Review first";
  else if (topic.badge === "stop") confidenceBadge.textContent = "Do not send";
  else confidenceBadge.textContent = "Draft";
}

function generate() {
  const data = context();
  const topic = detectTopic(`${data.question} ${data.docs} ${data.notes}`);
  const customerName = data.customer || "Customer";
  const subjectLine = `Subject: Re: ${topic.label}`;
  const opener = data.audience === "Internal Slack reply" ? "" : `${subjectLine}\n\nHi ${customerName} team,\n\n`;
  const closer = data.audience === "Internal Slack reply" ? "" : "\n\nBest,\n";
  const dealLine = data.dealSize ? `\n\nDeal context noted internally: ${data.dealSize}.` : "";

  topicSignal.textContent = topic.label;
  riskSignal.textContent = topic.risk;
  setBadge(topic);

  customerOutput.textContent = `${opener}${topic.customer(data)}${closer}`;
  internalOutput.textContent = `${topic.internal(data)}${dealLine}

Sources to anchor/check:
- ${topic.sources.join("\n- ")}

Suggested next step:
${topic.badge === "good" ? "Sales can usually send this after confirming the facts match the draft." : "Sales should route the specific request to the relevant owner if Customer is requesting a contract change, product-specific commitment, or exception."}`;

  statusPill.innerHTML = '<span class="status-dot"></span>Generated';
}

function clearForm() {
  questionInput.value = "";
  customerInput.value = "";
  dealSizeInput.value = "";
  notesInput.value = "";
  productInput.value = "ChatGPT Enterprise";
  audienceInput.value = "Customer email";
  document.querySelectorAll(".checkbox-grid input").forEach((box) => {
    box.checked = false;
  });
  customerOutput.textContent = "Paste a question and generate a response. The answer will appear here in a format GTM can paste into an email.";
  internalOutput.textContent = "Internal caveats, source links, and escalation guidance will appear here.";
  topicSignal.textContent = "Waiting for question";
  riskSignal.textContent = "Not assessed";
  confidenceBadge.className = "badge neutral";
  confidenceBadge.textContent = "Draft";
  statusPill.innerHTML = '<span class="status-dot"></span>Ready';
}

function loadSample() {
  questionInput.value = "Customer is asking whether Codex is covered by OpenAI's BAA. Customer is a healthcare customer using ChatGPT Enterprise and wants to add language to the order form confirming Codex is covered for PHI.";
  customerInput.value = "Athena Health";
  dealSizeInput.value = "$750K ARR";
  productInput.value = "Codex";
  audienceInput.value = "Customer email";
  notesInput.value = "Existing BAA is signed for ChatGPT regulated workspace. Need language before customer legal call tomorrow.";
  document.querySelectorAll(".checkbox-grid input").forEach((box) => {
    box.checked = ["BAA", "OF"].includes(box.value);
  });
  generate();
}

async function copyCustomerResponse() {
  await navigator.clipboard.writeText(customerOutput.textContent);
  statusPill.innerHTML = '<span class="status-dot"></span>Copied';
}

function renderTopics() {
  topics.forEach((topic) => {
    const chip = document.createElement("button");
    chip.className = "topic-chip";
    chip.type = "button";
    chip.textContent = topic.label;
    chip.addEventListener("click", () => {
      questionInput.value = `Customer question about ${topic.label.toLowerCase()}.`;
      generate();
    });
    topicChips.appendChild(chip);
  });
}

document.querySelector("#generateButton").addEventListener("click", generate);
document.querySelector("#clearButton").addEventListener("click", clearForm);
document.querySelector("#sampleButton").addEventListener("click", loadSample);
document.querySelector("#copyButton").addEventListener("click", copyCustomerResponse);

renderTopics();
