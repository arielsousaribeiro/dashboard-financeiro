/* =========================================
   DADOS DO DASHBOARD
========================================= */

const dados = {

    "1D": {
        labels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
        valores: [320, 580, 430, 760, 690, 920, 1100]
    },

    "7D": {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        valores: [1200, 1450, 1100, 1780, 1620, 2100, 1950]
    },

    "1M": {
        labels: [
            "01", "04", "07", "10", "13",
            "16", "19", "22", "25", "28", "30"
        ],

        valores: [
            3200,
            4100,
            3600,
            5200,
            4700,
            6100,
            5800,
            7200,
            6800,
            7900,
            8400
        ]
    },

    "1A": {
        labels: [
            "Jan", "Fev", "Mar", "Abr",
            "Mai", "Jun", "Jul", "Ago",
            "Set", "Out", "Nov", "Dez"
        ],

        valores: [
            18500,
            21300,
            19800,
            24500,
            27300,
            29100,
            31500,
            30200,
            33700,
            36100,
            38900,
            42100
        ]
    },

    "Tudo": {
        labels: [
            "2022",
            "2023",
            "2024",
            "2025",
            "2026"
        ],

        valores: [
            85000,
            126000,
            184000,
            245000,
            318000
        ]
    }

};


/* =========================================
   ELEMENTOS
========================================= */

const canvas = document.getElementById("meuGrafico");

const botoesFiltro =
    document.querySelectorAll(".filtro");

const totalAcumulado =
    document.getElementById("totalAcumulado");

const mediaDiaria =
    document.getElementById("mediaDiaria");

const crescimento =
    document.getElementById("crescimento");

const botaoTema =
    document.getElementById("botaoTema");


/* =========================================
   FORMATAÇÃO DE MOEDA
========================================= */

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================================
   CRIAÇÃO DO GRADIENTE
========================================= */

const contexto =
    canvas.getContext("2d");


const gradiente =
    contexto.createLinearGradient(
        0,
        0,
        0,
        430
    );


gradiente.addColorStop(
    0,
    "rgba(91, 92, 240, 0.35)"
);

gradiente.addColorStop(
    0.5,
    "rgba(139, 92, 246, 0.12)"
);

gradiente.addColorStop(
    1,
    "rgba(139, 92, 246, 0)"
);


/* =========================================
   CRIAÇÃO DO GRÁFICO
========================================= */

let grafico =
    new Chart(canvas, {

        type: "line",

        data: {

            labels: dados["1D"].labels,

            datasets: [

                {

                    label: "Movimentação",

                    data: dados["1D"].valores,

                    borderColor: "#6d5dfc",

                    backgroundColor: gradiente,

                    borderWidth: 3,

                    fill: true,

                    tension: 0.45,

                    pointRadius: 0,

                    pointHoverRadius: 7,

                    pointHoverBorderWidth: 3,

                    pointHoverBackgroundColor: "#ffffff",

                    pointHoverBorderColor: "#6d5dfc"

                }

            ]

        },


        options: {

            responsive: true,

            maintainAspectRatio: false,


            interaction: {

                intersect: false,

                mode: "index"

            },


            animation: {

                duration: 1000,

                easing: "easeOutQuart"

            },


            plugins: {

                legend: {

                    display: false

                },


                tooltip: {

                    backgroundColor:
                        "rgba(20, 22, 30, 0.95)",

                    titleColor: "#ffffff",

                    bodyColor: "#d7d9e0",

                    borderColor:
                        "rgba(255,255,255,0.08)",

                    borderWidth: 1,

                    padding: 14,

                    cornerRadius: 12,

                    displayColors: false,


                    callbacks: {

                        title: function(context) {

                            return context[0].label;

                        },


                        label: function(context) {

                            return "  " +
                                formatarMoeda(
                                    context.parsed.y
                                );

                        }

                    }

                }

            },


            scales: {

                x: {

                    border: {
                        display: false
                    },

                    grid: {

                        display: false

                    },

                    ticks: {

                        color: "#8b92a3",

                        font: {

                            family: "Inter",

                            size: 11

                        }

                    }

                },


                y: {

                    beginAtZero: true,

                    border: {

                        display: false

                    },

                    grid: {

                        color:
                            "rgba(120, 125, 145, 0.10)"

                    },

                    ticks: {

                        color: "#8b92a3",

                        font: {

                            family: "Inter",

                            size: 11

                        },


                        callback: function(valor) {

                            if (valor >= 1000) {

                                return "R$ " +
                                    (valor / 1000)
                                    .toFixed(1) +
                                    "k";

                            }

                            return "R$ " + valor;

                        }

                    }

                }

            }

        }

    });


/* =========================================
   ATUALIZA OS KPIs
========================================= */

function atualizarKPIs(valores) {

    const total =
        valores.reduce(
            (soma, valor) =>
                soma + valor,
            0
        );


    const media =
        total / valores.length;


    totalAcumulado.textContent =
        formatarMoeda(total);


    mediaDiaria.textContent =
        formatarMoeda(media);


    const crescimentoValor =
        valores.length > 1
            ? (
                (
                    valores[valores.length - 1]
                    -
                    valores[0]
                )
                /
                valores[0]
            ) * 100
            : 0;


    crescimento.textContent =
        (
            crescimentoValor >= 0
                ? "+"
                : ""
        )
        +
        crescimentoValor.toFixed(1)
        +
        "%";

}


/* =========================================
   FILTROS
========================================= */

botoesFiltro.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                botoesFiltro.forEach(
                    item =>
                        item.classList.remove(
                            "ativo"
                        )
                );


                botao.classList.add(
                    "ativo"
                );


                const periodo =
                    botao.dataset.periodo;


                const novoDados =
                    dados[periodo];


                grafico.data.labels =
                    novoDados.labels;


                grafico.data.datasets[0].data =
                    novoDados.valores;


                grafico.update();


                atualizarKPIs(
                    novoDados.valores
                );

            }
        );

    }
);


/* =========================================
   DARK MODE
========================================= */

botaoTema.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const modoEscuro =
            document.body.classList.contains(
                "dark"
            );


        botaoTema.textContent =
            modoEscuro
                ? "☀️"
                : "🌙";

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

atualizarKPIs(
    dados["1D"].valores
);