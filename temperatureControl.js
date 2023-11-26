const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pertinência variáveis linguísticas (frio, confortável, quente)
function pertinenciaFrio(temperatura) {
    if (temperatura <= 18) {
        return 1;
    } else if (temperatura > 18 && temperatura < 20) {
        return (20 - temperatura) / 2;
    } else {
        return 0;
    }
}

function pertinenciaConfortavel(temperatura) {
    if (temperatura > 18 && temperatura <= 24) {
        return Math.min((temperatura - 18) / 6, 
        (24 - temperatura) / 6);
    } else {
        return 0;
    }
}

function pertinenciaQuente(temperatura) {
    if (temperatura >= 24) {
        return 1;
    } else if (temperatura > 22 && temperatura < 24) {
        return (temperatura - 22) / 2;
    } else {
        return 0;
    }
}

// Inferir configuração do ar-condicionado
function controleArCondicionado(temperatura) {
  const pertFrio = pertinenciaFrio(temperatura);
  const pertConfortavel = pertinenciaConfortavel(temperatura);
  const pertQuente = pertinenciaQuente(temperatura);

  // Definição das regras
  const regras = [
      Math.min(pertFrio, 1),        // Se está frio, aumenta a temperatura
      pertConfortavel,              // Se está confortável, mantém a temperatura
      Math.min(pertQuente, 1)       // Se está quente, diminui a temperatura
  ];

  // Definição das ações baseadas nas regras
  const aumentoBase = 5; // Aumento base de temperatura em 5 graus
  const diminuicaoBase = 5; // Diminuição base de temperatura em 5 graus

  const acao = regras.reduce((acc, cur, idx) => {
      if (cur > acc.valor) {
          return { valor: cur, acao: idx };
          
      }
      return acc;
  }, { valor: -Infinity, acao: -1 });

  let aumento = 0;
  let diminuicao = 0;

  switch (acao.acao) {
      case 0:
          aumento = aumentoBase * acao.valor; // Aumento proporcional baseado na pertinência
          return `Aumentar a temperatura em ${aumento} graus`;
      case 1:
          return 'Manter a temperatura';
      case 2:
          diminuicao = diminuicaoBase * acao.valor; // Diminuição proporcional baseada na pertinência
          return `Diminuir a temperatura em ${diminuicao} graus`;
      default:
          return 'Sem ação definida';
  }
}

rl.question('Qual é a temperatura ambiente? ', (temperaturaInput) => {
  const temperaturaAmbiente = parseFloat(temperaturaInput);
  const acaoArCondicionado = controleArCondicionado(temperaturaAmbiente);

  console.log(`Temperatura ambiente: ${temperaturaAmbiente}°C`);
  console.log(`Ação do ar-condicionado: ${acaoArCondicionado}`);

  rl.close();
});