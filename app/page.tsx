import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">$</span>
            <h1 className="text-2xl font-bold">OmniMED</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-slate-900">Suporte clínico rápido e confiável</h2>
          <p className="text-lg text-slate-600 mb-8">Cálculos de doses e guias baseados em evidências científicas para emergências médicas.</p>
          <Link href="/calculator" className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition">
            Acessar Calculadora IOT
          </Link>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '•', title: 'Baseado em Evidências', desc: 'Protocolos baseados em literatura médica' },
            { icon: '=', title: 'Calculadoras Precisas', desc: 'Cálculos automáticos de doses' },
            { icon: '⏱', title: 'Acesso Rápido', desc: 'Interface otimizada para emergências' }
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
