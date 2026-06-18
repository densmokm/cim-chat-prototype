import { useState, useRef, useEffect } from "react";

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  blue900: "#042C53", blue800: "#0C447C", blue600: "#185FA5", blue100: "#B5D4F4", blue50: "#E6F1FB",
  green800: "#27500A", green600: "#3B6D11", green50: "#EAF3DE",
  amber800: "#633806", amber600: "#854F0B", amber50: "#FAEEDA",
  red800: "#791F1F", red600: "#A32D2D", red50: "#FCEBEB",
  gray800: "#444441", gray600: "#5F5E5A", gray200: "#B4B2A9", gray100: "#D3D1C7", gray50: "#F1EFE8",
  white: "#FFFFFF", border: "#E2E0D8", borderMid: "#C8C6BC",
  textPrimary: "#1A1A18", textSecondary: "#5F5E5A", textTertiary: "#888780",
  bgPage: "#F7F6F2", bgSurface: "#FFFFFF", bgSubtle: "#F1EFE8",
};

// ── Tiny helpers ──────────────────────────────────────────────────────────────
const Badge = ({ color = "blue", children }) => {
  const map = { blue: [C.blue50, C.blue800], green: [C.green50, C.green800], amber: [C.amber50, C.amber800], red: [C.red50, C.red800], gray: [C.gray50, C.gray800] };
  const [bg, text] = map[color] || map.blue;
  return <span style={{ display: "inline-flex", alignItems: "center", fontSize: 10, padding: "2px 7px", borderRadius: 10, fontWeight: 600, background: bg, color: text }}>{children}</span>;
};

const Notice = ({ color = "blue", children }) => {
  const map = { blue: [C.blue50, C.blue800], amber: [C.amber50, C.amber800], green: [C.green50, C.green800], red: [C.red50, C.red800] };
  const [bg, text] = map[color];
  return <div style={{ fontSize: 11, borderRadius: 6, padding: "8px 10px", marginBottom: 10, display: "flex", alignItems: "flex-start", gap: 6, background: bg, color: text }}>{children}</div>;
};

const Btn = ({ variant = "default", onClick, children, style = {} }) => {
  const [hover, setHover] = useState(false);
  const base = { fontSize: 11, padding: "5px 12px", border: `0.5px solid ${C.borderMid}`, borderRadius: 6, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, transition: "background 0.1s", fontFamily: "inherit" };
  const variants = {
    default: { background: hover ? C.bgSubtle : C.bgSurface, color: C.textPrimary, border: `0.5px solid ${C.borderMid}` },
    primary: { background: hover ? C.blue800 : C.blue600, color: C.white, border: `0.5px solid ${C.blue600}` },
    success: { background: hover ? C.green50 : C.bgSurface, color: C.green600, border: `0.5px solid ${C.green600}` },
    danger: { background: hover ? C.red50 : C.bgSurface, color: C.red600, border: `0.5px solid ${C.red600}` },
  };
  return <button style={{ ...base, ...variants[variant], ...style }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick}>{children}</button>;
};

const Label = ({ children }) => <div style={{ fontSize: 11, color: C.textSecondary, fontWeight: 600, marginBottom: 4 }}>{children}</div>;

const Input = ({ id, placeholder, defaultValue, style = {} }) => (
  <input id={id} placeholder={placeholder} defaultValue={defaultValue}
    style={{ fontSize: 12, padding: "7px 10px", border: `0.5px solid ${C.borderMid}`, borderRadius: 6, background: C.bgSurface, color: C.textPrimary, width: "100%", fontFamily: "inherit", outline: "none", boxSizing: "border-box", ...style }} />
);

const Select = ({ id, children, style = {} }) => (
  <select id={id} style={{ fontSize: 12, padding: "7px 10px", border: `0.5px solid ${C.borderMid}`, borderRadius: 6, background: C.bgSurface, color: C.textPrimary, width: "100%", fontFamily: "inherit", ...style }}>
    {children}
  </select>
);

const DataCard = ({ header, icon, children, borderColor }) => (
  <div style={{ background: C.bgSurface, border: `0.5px solid ${borderColor || C.border}`, borderRadius: 6, overflow: "hidden", marginTop: 8 }}>
    <div style={{ padding: "8px 12px", background: C.bgSubtle, borderBottom: `0.5px solid ${borderColor || C.border}`, fontSize: 11, fontWeight: 600, color: C.textSecondary, display: "flex", alignItems: "center", gap: 6 }}>
      {icon} {header}
    </div>
    <div style={{ padding: 12 }}>{children}</div>
  </div>
);

const StepBar = ({ current }) => {
  const steps = ["Find user", "Card details", "Confirm"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
      {steps.map((s, i) => {
        const done = i < current - 1, active = i === current - 1;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : undefined }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, flexShrink: 0, background: done ? C.green50 : active ? C.blue50 : C.bgSubtle, border: `0.5px solid ${done ? C.green600 : active ? C.blue600 : C.borderMid}`, color: done ? C.green600 : active ? C.blue600 : C.textSecondary }}>
                {done ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: done ? C.green600 : active ? C.blue600 : C.textSecondary, whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 0.5, background: C.border, margin: "0 8px" }} />}
          </div>
        );
      })}
    </div>
  );
};

const UserCard = ({ name, uuid, org }) => {
  const initials = name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: C.bgSubtle, border: `0.5px solid ${C.border}`, borderRadius: 6, marginBottom: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.blue50, color: C.blue800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{initials}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{name}</div>
        <div style={{ fontSize: 11, color: C.textSecondary, fontFamily: "monospace" }}>{uuid} · {org}</div>
      </div>
      <Badge color="green">Active</Badge>
    </div>
  );
};

const Table = ({ headers, rows }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    {headers && <thead><tr>{headers.map((h, i) => <th key={i} style={{ padding: "6px 12px", textAlign: "left", borderBottom: `0.5px solid ${C.border}`, fontSize: 11, fontWeight: 600, color: C.textSecondary }}>{h}</th>)}</tr></thead>}
    <tbody>{rows.map((row, i) => (
      <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: "6px 12px", borderBottom: i < rows.length - 1 ? `0.5px solid ${C.border}` : "none", fontSize: 12, color: C.textPrimary }}>{cell}</td>)}</tr>
    ))}</tbody>
  </table>
);

const StatRow = ({ stats }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 8, marginTop: 8 }}>
    {stats.map(({ num, label }) => (
      <div key={label} style={{ background: C.bgSubtle, border: `0.5px solid ${C.border}`, borderRadius: 6, padding: "10px 12px", textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: C.textPrimary }}>{num}</div>
        <div style={{ fontSize: 10, color: C.textSecondary, marginTop: 2 }}>{label}</div>
      </div>
    ))}
  </div>
);

// ── Message content builders ──────────────────────────────────────────────────
function AuthSummaryMsg({ onAction }) {
  return (
    <div>
      <p style={{ fontSize: 13, marginBottom: 8 }}>Here is a summary of active authenticators across AAD_RPT as of today's data load.</p>
      <StatRow stats={[{ num: "14,382", label: "Total active" }, { num: "1,204", label: "Orgs covered" }, { num: "98", label: "Deregistered (30d)" }]} />
      <DataCard header="By authenticator type" icon="📋">
        <Table
          headers={["Type", "Count", "Source", "% of total"]}
          rows={[
            ["Smartcard (Standard)", "6,841", <Badge color="blue">CIS1</Badge>, "47.6%"],
            ["MS Authenticator", "4,112", <Badge color="green">CIS2</Badge>, "28.6%"],
            ["Windows Hello", "2,190", <Badge color="green">CIS2</Badge>, "15.2%"],
            ["Security Key", "891", <Badge color="green">CIS2</Badge>, "6.2%"],
            ["Passkey", "348", <Badge color="green">CIS2</Badge>, "2.4%"],
          ]}
        />
      </DataCard>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
        <Btn onClick={() => onAction("issue")}>💳 Issue smartcard</Btn>
        <Btn onClick={() => onAction("inactive")}>🕐 Find inactive</Btn>
      </div>
    </div>
  );
}

function InactiveUsersMsg({ onAction }) {
  return (
    <div>
      <p style={{ fontSize: 13, marginBottom: 8 }}>Found 47 users with no authenticator activity in the last 90 days. These may be candidates for review or deregistration.</p>
      <DataCard header="Inactive authenticators - sample" icon="⚠️">
        <Table
          headers={["Name", "UUID", "Type", "Last used", "Org"]}
          rows={[
            ["Sarah Okafor", <span style={{ fontFamily: "monospace", fontSize: 11 }}>3F8A21C</span>, "Smartcard", <Badge color="red">128d ago</Badge>, "Leeds Teaching Hospitals"],
            ["Daniel Frost", <span style={{ fontFamily: "monospace", fontSize: 11 }}>9B2D44E</span>, "MS Authenticator", <Badge color="amber">97d ago</Badge>, "NHS Greater Manchester"],
            ["Priya Mehta", <span style={{ fontFamily: "monospace", fontSize: 11 }}>1C6F88A</span>, "Windows Hello", <Badge color="amber">91d ago</Badge>, "UCLH"],
          ]}
        />
      </DataCard>
      <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 8 }}>
        Showing 3 of 47. Sourced from <code>public.fact_authenticator</code> via <code>last_used_date</code>.
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
        <Btn onClick={() => onAction("deregister")}>🗑 Deregister one</Btn>
        <Btn onClick={() => onAction("contact_ra")}>✉️ Contact their RA</Btn>
        <Btn onClick={() => alert("In production this would export to CSV")}>⬇ Export all 47</Btn>
      </div>
    </div>
  );
}

function IssueSmartcardFlow({ onAction }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  if (step === 1) return (
    <div>
      <p style={{ fontSize: 13, marginBottom: 8 }}>I can raise a smartcard issuance request via CIS1. This goes through your RA, who must verify identity before the card is activated.</p>
      <DataCard header="Issue smartcard - step 1 of 3: find user" icon="💳">
        <StepBar current={1} />
        <div style={{ marginBottom: 10 }}>
          <Label>User UUID or name</Label>
          <Input id="sc-lookup" placeholder="e.g. 3F8A21C or Sarah Okafor" />
        </div>
        <Notice color="blue">The user must already exist in CIM. If they are a new starter, their account must be created first.</Notice>
        <Btn variant="primary" onClick={() => {
          const val = document.getElementById("sc-lookup")?.value || "";
          const name = val && !val.match(/^[0-9A-F]+$/i) ? val : "Sarah Okafor";
          const uuid = val.match(/^[0-9A-F]{5,}$/i) ? val.toUpperCase() : "3F8A21C";
          setData({ name, uuid, org: "Leeds Teaching Hospitals NHS FT" });
          setStep(2);
        }}>🔍 Look up user</Btn>
      </DataCard>
    </div>
  );

  if (step === 2) return (
    <DataCard header="Issue smartcard - step 2 of 3: card details" icon="💳">
      <StepBar current={2} />
      <UserCard name={data.name} uuid={data.uuid} org={data.org} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        <div><Label>Card type</Label><Select id="sc-type"><option value="standard">Smartcard (Standard)</option><option value="emergency">Smartcard (Emergency)</option></Select></div>
        <div><Label>Reason for issue</Label>
          <Select id="sc-reason">
            <option>New starter</option>
            <option>Replacement - lost card</option>
            <option>Replacement - damaged card</option>
            <option>Replacement - expired cert</option>
            <option>Role change requiring new card</option>
          </Select>
        </div>
      </div>
      <div style={{ marginBottom: 10 }}><Label>Preferred delivery organisation</Label><Input id="sc-delivery" defaultValue={data.org} /></div>
      <div style={{ marginBottom: 10 }}><Label>RA notes (optional)</Label><Input id="sc-notes" placeholder="Any notes for the RA..." /></div>
      <Notice color="amber">Emergency smartcards have a 30-day certificate validity. Standard cards are valid for 3 years. Only request an emergency card if there is a clinical need.</Notice>
      <div style={{ display: "flex", gap: 6 }}>
        <Btn variant="primary" onClick={() => {
          const cardType = document.getElementById("sc-type")?.value || "standard";
          const reason = document.getElementById("sc-reason")?.value || "New starter";
          const serial = "SC-" + Math.floor(10000000 + Math.random() * 90000000);
          const expiry = cardType === "emergency" ? "18 July 2026" : "18 June 2029";
          setData(d => ({ ...d, cardType, reason, serial, expiry }));
          setStep(3);
        }}>→ Review request</Btn>
        <Btn onClick={() => setStep(1)}>Start again</Btn>
      </div>
    </DataCard>
  );

  if (step === 3) return (
    <DataCard header="Issue smartcard - step 3 of 3: confirm" icon="💳">
      <StepBar current={3} />
      <div style={{ fontSize: 12, color: C.textSecondary, fontWeight: 600, marginBottom: 8 }}>Review before submitting to CIS1</div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 10 }}>
        <tbody>
          {[
            ["User", data.name],
            ["UUID", <span style={{ fontFamily: "monospace", fontSize: 11 }}>{data.uuid}</span>],
            ["Organisation", data.org],
            ["Card type", <span>{data.cardType === "emergency" ? "Smartcard (Emergency) " : "Smartcard (Standard) "}{data.cardType === "emergency" && <Badge color="amber">Emergency</Badge>}</span>],
            ["Serial no.", <span style={{ fontFamily: "monospace", fontSize: 11 }}>{data.serial}</span>],
            ["Cert expiry", data.expiry],
            ["Reason", data.reason],
            ["Status", <Badge color="amber">Pending RA verification</Badge>],
          ].map(([k, v], i) => (
            <tr key={i}>
              <td style={{ color: C.textSecondary, padding: "4px 0", width: 120, fontSize: 12, borderBottom: `0.5px solid ${C.border}` }}>{k}</td>
              <td style={{ padding: "4px 0", fontSize: 12, borderBottom: `0.5px solid ${C.border}` }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Notice color="blue">Submitting will notify the RA for {data.org}. The card is not active until the RA verifies identity and approves in CIS1. The record will appear in <code>staging.cis1_auth_staging</code> after the next batch load.</Notice>
      <div style={{ display: "flex", gap: 6 }}>
        <Btn variant="success" onClick={() => setStep(4)}>✓ Submit to CIS1</Btn>
        <Btn onClick={() => setStep(1)}>Start again</Btn>
      </div>
    </DataCard>
  );

  // step 4: confirmed
  const ref = "CIS1-SC-2026-" + Math.floor(1000 + Math.random() * 9000);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ color: C.green600, fontSize: 18 }}>✓</span>
        <span style={{ fontWeight: 600, fontSize: 14 }}>Smartcard request submitted</span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 10 }}>
        <tbody>
          {[
            ["Reference", <span style={{ fontFamily: "monospace", fontSize: 11 }}>{ref}</span>],
            ["User", <span>{data.name} · <span style={{ fontFamily: "monospace", fontSize: 11 }}>{data.uuid}</span></span>],
            ["Card type", data.cardType === "emergency" ? "Smartcard (Emergency)" : "Smartcard (Standard)"],
            ["Serial no.", <span style={{ fontFamily: "monospace", fontSize: 11 }}>{data.serial}</span>],
            ["Cert expiry", data.expiry],
            ["Status", <Badge color="amber">Pending RA verification</Badge>],
            ["Submitted", new Date().toLocaleString("en-GB")],
          ].map(([k, v], i, arr) => (
            <tr key={i}>
              <td style={{ color: C.textSecondary, padding: "4px 0", width: 120, fontSize: 12, borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none" }}>{k}</td>
              <td style={{ padding: "4px 0", fontSize: 12, borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none" }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Notice color="green">The RA for {data.org} has been notified. Once they verify identity and approve in CIS1, the card will move to Active. It will appear in <code>staging.cis1_auth_staging</code> at the next overnight batch load.</Notice>
      <div style={{ display: "flex", gap: 6 }}>
        <Btn onClick={() => onAction("contact_ra")}>✉️ Contact RA directly</Btn>
        <Btn onClick={() => setStep(1)}>💳 Issue another</Btn>
      </div>
    </div>
  );
}

function RegisterAuthMsg() {
  const [done, setDone] = useState(false);
  if (done) {
    const uuid = document.getElementById("reg-uuid")?.value || "AUTO";
    const type = document.getElementById("reg-type")?.value || "MS Authenticator";
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><span style={{ color: C.green600 }}>✓</span><span style={{ fontWeight: 600 }}>Registration submitted</span></div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {[["UUID", <span style={{ fontFamily: "monospace", fontSize: 11 }}>{uuid}</span>], ["Type", type], ["Status", <Badge color="green">Queued for CIS2</Badge>], ["ETL job", <span style={{ fontFamily: "monospace", fontSize: 11 }}>TXN-REG-2026-1183</span>]].map(([k, v], i) => (
              <tr key={i}><td style={{ color: C.textSecondary, padding: "3px 0", width: 100, fontSize: 12 }}>{k}</td><td style={{ padding: "3px 0", fontSize: 12 }}>{v}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <p style={{ fontSize: 13, marginBottom: 8 }}>I can raise a new authenticator registration. I'll need a few details.</p>
      <DataCard header="Register authenticator" icon="📱">
        <div style={{ marginBottom: 10 }}><Label>User UUID</Label><Input id="reg-uuid" placeholder="e.g. 3F8A21C" /></div>
        <div style={{ marginBottom: 10 }}><Label>Authenticator type</Label>
          <Select id="reg-type"><option>MS Authenticator</option><option>Windows Hello</option><option>Security Key</option><option>Passkey</option></Select>
        </div>
        <div style={{ marginBottom: 10 }}><Label>Device ID (optional)</Label><Input id="reg-device" placeholder="Leave blank to auto-assign" /></div>
        <div style={{ marginBottom: 10 }}><Label>Reason</Label><Input id="reg-reason" placeholder="e.g. New hire, device replacement" /></div>
        <Btn variant="primary" onClick={() => setDone(true)}>✓ Submit registration</Btn>
      </DataCard>
    </div>
  );
}

function ContactRAMsg() {
  const [found, setFound] = useState(false);
  return (
    <div>
      <p style={{ fontSize: 13, marginBottom: 8 }}>I can look up the Registered Authority for a user's organisation.</p>
      <DataCard header="RA lookup" icon="📖">
        <div style={{ marginBottom: 10 }}><Label>User UUID or name</Label><Input id="ra-lookup" placeholder="e.g. 3F8A21C or Sarah Okafor" /></div>
        <Btn variant="primary" onClick={() => setFound(true)}>🔍 Look up RA</Btn>
        {found && (
          <div style={{ marginTop: 10, borderTop: `0.5px solid ${C.border}`, paddingTop: 10 }}>
            <div style={{ fontSize: 12, color: C.textSecondary, fontWeight: 600, marginBottom: 6 }}>RA details - Leeds Teaching Hospitals</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["RA manager", "Janet Blackwood"],
                  ["RA parent org", "NHS West Yorkshire ICB"],
                  ["Contact", <span style={{ color: C.blue600 }}>ra.leeds@nhs.net</span>],
                  ["Source", <Badge color="blue">sem_user.ra_parent_org_code</Badge>],
                ].map(([k, v], i) => (
                  <tr key={i}><td style={{ color: C.textSecondary, padding: "3px 0", width: 120, fontSize: 12 }}>{k}</td><td style={{ padding: "3px 0", fontSize: 12 }}>{v}</td></tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <Btn variant="primary" onClick={() => alert("In production: opens pre-populated email to RA")}>✉️ Email RA</Btn>
              <Btn onClick={() => alert("In production: copies contact details to clipboard")}>📋 Copy details</Btn>
            </div>
          </div>
        )}
      </DataCard>
    </div>
  );
}

function DeregisterMsg() {
  const [done, setDone] = useState(false);
  if (done) {
    const uuid = document.getElementById("dereg-uuid")?.value || "AUTO";
    const type = document.getElementById("dereg-type")?.value || "Smartcard";
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><span style={{ color: C.green600 }}>✓</span><span style={{ fontWeight: 600 }}>Deregistration logged</span></div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {[["UUID", <span style={{ fontFamily: "monospace", fontSize: 11 }}>{uuid}</span>], ["Authenticator", type], ["Status", <Badge color="red">Deregistered</Badge>], ["Logged at", new Date().toLocaleString("en-GB")]].map(([k, v], i) => (
              <tr key={i}><td style={{ color: C.textSecondary, padding: "3px 0", width: 120, fontSize: 12 }}>{k}</td><td style={{ padding: "3px 0", fontSize: 12 }}>{v}</td></tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 8 }}><code>fact_authenticator.is_deregistered</code> will be updated at the next ETL run.</div>
      </div>
    );
  }
  return (
    <div>
      <p style={{ fontSize: 13, marginBottom: 8 }}>I can raise a deregistration request. This will mark the authenticator as deregistered in <code>fact_authenticator</code> and log the event.</p>
      <DataCard header="Deregister authenticator" icon="⚠️" borderColor={C.red600}>
        <div style={{ marginBottom: 10 }}><Label>User UUID</Label><Input id="dereg-uuid" placeholder="e.g. 3F8A21C" /></div>
        <div style={{ marginBottom: 10 }}><Label>Authenticator to remove</Label>
          <Select id="dereg-type">
            <option>Smartcard (Standard) - SN: 4821093</option>
            <option>MS Authenticator - Device: iPhone 14</option>
            <option>Windows Hello - Device: LTHT-LAPTOP-042</option>
          </Select>
        </div>
        <div style={{ marginBottom: 10 }}><Label>Reason for deregistration</Label>
          <Select id="dereg-reason">
            <option>Leaver - staff left organisation</option>
            <option>Lost or stolen device</option>
            <option>Device replacement</option>
            <option>Security concern</option>
            <option>User request</option>
          </Select>
        </div>
        <Notice color="amber">This action will be logged with your user ID and a timestamp. It cannot be undone from this interface.</Notice>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn variant="danger" onClick={() => setDone(true)}>🗑 Confirm deregistration</Btn>
        </div>
      </DataCard>
    </div>
  );
}

function FallbackMsg({ onAction }) {
  const options = [
    ["Authenticator summary", "summary"],
    ["Inactive users (90d)", "inactive"],
    ["Issue smartcard", "issue"],
    ["Register authenticator", "register"],
    ["Contact RA", "contact_ra"],
    ["Deregister authenticator", "deregister"],
  ];
  return (
    <div>
      <p style={{ fontSize: 13, marginBottom: 8 }}>I don't have a demo scenario for that - this prototype covers a representative set. Try one of these:</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {options.map(([label, key]) => <Btn key={key} onClick={() => onAction(key)}>→ {label}</Btn>)}
      </div>
    </div>
  );
}

// ── Scenario matching ─────────────────────────────────────────────────────────
function matchIntent(text) {
  const n = text.toLowerCase();
  if (n.includes("inactive") || n.includes("90 day") || n.includes("last used")) return "inactive";
  if ((n.includes("smartcard") || n.includes("smart card")) && (n.includes("issue") || n.includes("new") || n.includes("request") || n.includes("order"))) return "issue";
  if (n.includes("authenticator") && (n.includes("how many") || n.includes("count") || n.includes("summary") || n.includes("active"))) return "summary";
  if (n.includes("summary") || n.includes("authenticator summary")) return "summary";
  if (n.includes("inactive users")) return "inactive";
  if (n.includes("issue smartcard") || n.includes("issue a")) return "issue";
  if (n.includes("register") && !n.includes("deregister")) return "register";
  if (n.includes("contact") && (n.includes("ra") || n.includes("authority"))) return "contact_ra";
  if (n.includes("deregister") || n.includes("revoke")) return "deregister";
  return null;
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function CIMAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", intent: "welcome", id: 0 }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const idRef = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const chips = [
    { label: "Authenticator summary", key: "summary" },
    { label: "Inactive users", key: "inactive" },
    { label: "💳 Issue smartcard", key: "issue", highlight: true },
    { label: "Register authenticator", key: "register" },
    { label: "Contact RA", key: "contact_ra" },
    { label: "Deregister", key: "deregister" },
  ];

  const chipLabels = {
    summary: "How many active authenticators are there across my organisation?",
    inactive: "Show me users who haven't used their authenticator in the last 90 days",
    issue: "Issue a new smartcard to a user",
    register: "Register a new authenticator for a user",
    contact_ra: "I need to contact the RA for a user",
    deregister: "Deregister an authenticator",
  };

  function addUserMessage(text) {
    setMessages(prev => [...prev, { role: "user", text, id: idRef.current++ }]);
  }

  async function addAssistantMessage(intent) {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    setLoading(false);
    setMessages(prev => [...prev, { role: "assistant", intent, id: idRef.current++ }]);
  }

  function handleSend(textOverride) {
    const text = textOverride || input.trim();
    if (!text || loading) return;
    setInput("");
    addUserMessage(text);
    const intent = matchIntent(text) || "fallback";
    addAssistantMessage(intent);
  }

  function handleChip(key) {
    addUserMessage(chipLabels[key]);
    addAssistantMessage(key);
  }

  function handleAction(key) {
    addUserMessage(chipLabels[key] || key);
    addAssistantMessage(key);
  }

  function renderAssistant(msg) {
    switch (msg.intent) {
      case "welcome": return <p style={{ fontSize: 13 }}>Hi - I can help you query identity and access data, or take action on authenticators and smartcards. Try one of the suggestions above, or ask me anything.</p>;
      case "summary": return <AuthSummaryMsg onAction={handleAction} />;
      case "inactive": return <InactiveUsersMsg onAction={handleAction} />;
      case "issue": return <IssueSmartcardFlow key={msg.id} onAction={handleAction} />;
      case "register": return <RegisterAuthMsg key={msg.id} />;
      case "contact_ra": return <ContactRAMsg key={msg.id} />;
      case "deregister": return <DeregisterMsg key={msg.id} />;
      default: return <FallbackMsg onAction={handleAction} />;
    }
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: C.bgPage, minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 700, background: C.bgSurface, border: `0.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", height: "calc(100vh - 48px)", minHeight: 500 }}>

        {/* Header */}
        <div style={{ padding: "12px 16px", borderBottom: `0.5px solid ${C.border}`, background: C.bgSubtle, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, background: C.blue600, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: C.white, fontSize: 14 }}>🪪</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>CIM Assistant</div>
            <div style={{ fontSize: 11, color: C.textSecondary }}>Care Identity Management - AAD_RPT</div>
          </div>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green600 }} title="Connected to AAD_RPT" />
        </div>

        {/* Chips */}
        <div style={{ padding: "8px 12px", borderBottom: `0.5px solid ${C.border}`, display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0, background: C.bgSurface }}>
          {chips.map(({ label, key, highlight }) => (
            <button key={key} onClick={() => handleChip(key)} style={{ fontSize: 11, padding: "3px 10px", border: `0.5px solid ${highlight ? C.blue600 : C.borderMid}`, borderRadius: 20, cursor: "pointer", color: highlight ? C.blue600 : C.textSecondary, background: highlight ? C.blue50 : "transparent", fontFamily: "inherit", transition: "background 0.1s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, flexShrink: 0, marginTop: 2, background: msg.role === "assistant" ? C.blue50 : C.bgSubtle, color: msg.role === "assistant" ? C.blue800 : C.textSecondary }}>
                {msg.role === "assistant" ? "CI" : "KD"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: C.textSecondary, marginBottom: 4, fontWeight: 600, letterSpacing: "0.3px" }}>
                  {msg.role === "assistant" ? "CIM ASSISTANT" : "YOU"}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6, padding: "10px 13px", borderRadius: 6, color: C.textPrimary, border: `0.5px solid ${C.border}`, background: C.bgSubtle }}>
                  {msg.role === "assistant" ? renderAssistant(msg) : msg.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.blue50, color: C.blue800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, flexShrink: 0 }}>CI</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: C.textSecondary, marginBottom: 4, fontWeight: 600 }}>CIM ASSISTANT</div>
                <div style={{ padding: "10px 13px", borderRadius: 6, border: `0.5px solid ${C.border}`, background: C.bgSubtle, display: "flex", gap: 4 }}>
                  {[0, 150, 300].map(d => (
                    <div key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: C.textSecondary, animation: `bounce 1.2s ${d}ms infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "10px 12px", borderTop: `0.5px solid ${C.border}`, display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask about users, authenticators, smartcards..."
            disabled={loading}
            style={{ flex: 1, fontSize: 13, padding: "8px 12px", border: `0.5px solid ${C.borderMid}`, borderRadius: 20, background: C.bgSubtle, color: C.textPrimary, outline: "none", fontFamily: "inherit", height: 36 }} />
          <button onClick={() => handleSend()} disabled={loading || !input.trim()}
            style={{ width: 34, height: 34, background: loading || !input.trim() ? C.bgSubtle : C.blue600, color: loading || !input.trim() ? C.textSecondary : C.white, border: "none", borderRadius: "50%", cursor: loading || !input.trim() ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "background 0.1s", flexShrink: 0 }}>
            ↑
          </button>
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0);opacity:0.5} 30%{transform:translateY(-4px);opacity:1} }`}</style>
    </div>
  );
}
