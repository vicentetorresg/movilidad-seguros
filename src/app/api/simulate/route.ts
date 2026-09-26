import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { slug, capital, balance, cuotas } = await req.json();

    const resp = await fetch(process.env.SIMULATOR_API_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loanBank: slug,
        loanCapitalAmount: capital,
        loanBalanceAmount: balance,
        loanOutstandingFees: cuotas,
        loanCapitalCurrency: "CLP",
      }),
    });

    if (!resp.ok) {
      return NextResponse.json(
        { error: "API error", status: resp.status },
        { status: 502 }
      );
    }

    const data = await resp.json();
    const simulations = data.simulations || [];

    let desg = 0;
    let dese = 0;
    for (const s of simulations) {
      if (s.leadProductType === "DESG") desg = s.cashbackUserSimulationAmount || 0;
      if (s.leadProductType === "DESE") dese = s.cashbackUserSimulationAmount || 0;
    }

    return NextResponse.json({
      desgAmount: Math.max(0, desg),
      deseAmount: Math.max(0, dese),
      total: Math.max(0, desg) + Math.max(0, dese),
    });
  } catch {
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
