// ==========================================
// DADOS DO GRÁFICO
// ==========================================

const dados = {

    "1D": {
        labels: [
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00"
        ],

        valores: [
            320,
            580,
            430,
            760,
            690,
            920,
            1100
        ]
    },

    "7D": {
        labels: [
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb",
            "Dom"
        ],

        valores: [
            1200,
            1450,
            1100,
            1780,
            1620,
            2100,
            1950
        ]
    },

    "1M": {
        labels: [
            "01",
            "04",
            "07",
            "10",
            "13",
            "16",
            "19",
            "22",
            "25",
            "28",
            "30"
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
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
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


// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const canvas =
    document.getElementById("meuGrafico");

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


// ==========================================
// FORMATAÇÃO DE MOEDA
// ==========================================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==========================================
// CORES DO GRÁFICO
// ==========================================

function obterCores() {

    const escuro =
        document.body.classList.contains("dark");

    return {

        texto:
            escuro
                ? "#8b949e"
                : "#8b92a3",

        grade:
            escuro
                ? "rgba(255,255,255,0.06)"
                : "rgba(120,125,145,0.09)",

        linha:
            "#6d5dfc",

        area:
            escuro
                ? "rgba(109,93,252,0.18)"
                : "rgba(109,93,252,0.18)"

    };

}


// ==========================================
// PLUGIN — LINHA VERTICAL
// ==========================================

const linhaVertical = {

    id: "linhaVertical",

    afterDraw(chart) {

        const ativos =
            chart.tooltip?.getActiveElements?.();

        if (!ativos || !ativos.length) {
            return;
        }

        const elemento =
            ativos[0].element;

        const x =
            elemento.x;

        const area =
            chart.chartArea;

        const ctx =
            chart.ctx;

        const cores =
            obterCores();

        ctx.save();

        ctx.beginPath();

        ctx.moveTo(
            x,
            area.top
        );

        ctx.lineTo(
            x,
            area.bottom
        );

        ctx.lineWidth = 1;

        ctx.strokeStyle =
            cores.linha;

        ctx.globalAlpha = 0.18;

        ctx.setLineDash([
            5,
            5
        ]);

        ctx.stroke();

        ctx.restore();

    }

};


// ==========================================
// CONTEXTO DO CANVAS
// ==========================================

const contexto =
    canvas.getContext("2d");


// ==========================================
// GRADIENTE DINÂMICO
// ==========================================

function criarGradiente(chart) {

    const area =
        chart.chartArea;

    if (!area) {
        return "rgba(109,93,252,0.15)";
    }

    const gradiente =
        contexto.createLinearGradient(
            0,
            area.top,
            0,
            area.bottom
        );

    gradiente.addColorStop(
        0,
        "rgba(109,93,252,0.28)"
    );

    gradiente.addColorStop(
        0.55,
        "rgba(109,93,252,0.08)"
    );

    gradiente.addColorStop(
        1,
        "rgba(109,93,252,0)"
    );

    return gradiente;

}


// ==========================================
// CRIAÇÃO DO GRÁFICO
// ==========================================

let grafico =
    new Chart(
        canvas,
        {

            type: "line",

            data: {

                labels:
                    dados["1D"].labels,

                datasets: [

                    {

                        label:
                            "Movimentação",

                        data:
                            dados["1D"].valores,

                        borderColor:
                            "#6d5dfc",

                        backgroundColor:
                            function(context) {

                                return criarGradiente(
                                    context.chart
                                );

                            },

                        borderWidth:
                            2.5,

                        fill:
                            true,

                        tension:
                            0.42,

                        cubicInterpolationMode:
                            "monotone",

                        pointRadius:
                            0,

                        pointHoverRadius:
                            5,

                        pointHoverBorderWidth:
                            3,

                        pointHoverBackgroundColor:
                            "#ffffff",

                        pointHoverBorderColor:
                            "#6d5dfc",

                        spanGaps:
                            true
                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                interaction: {

                    mode:
                        "index",

                    intersect:
                        false
                },


                animation: {

                    duration:
                        850,

                    easing:
                        "easeOutQuart"
                },


                plugins: {

                    legend: {

                        display:
                            false
                    },


                    tooltip: {

    enabled: false,

    external: function(context) {

        const chart =
            context.chart;

        const tooltip =
            context.tooltip;


        let elemento =
            document.getElementById(
                "tooltipFinanceiro"
            );


        if (!elemento) {

            elemento =
                document.createElement(
                    "div"
                );

            elemento.id =
                "tooltipFinanceiro";


            elemento.innerHTML = `

                <div class="tooltip-financeiro">

                    <div class="tooltip-cabecalho">

                        <span class="tooltip-ponto"></span>

                        <span class="tooltip-data"></span>

                    </div>

                    <div class="tooltip-valor"></div>

                    <div class="tooltip-legenda">
                        Movimentação
                    </div>

                </div>

            `;


            document.body.appendChild(
                elemento
            );

        }


        if (
            tooltip.opacity === 0
        ) {

            elemento.style.opacity =
                "0";

            elemento.style.transform =
                "translateY(6px)";

            return;

        }


        const ponto =
            tooltip.dataPoints[0];


        if (!ponto) {
            return;
        }


        const valor =
            ponto.parsed.y;

        const label =
            ponto.label;


        elemento.querySelector(
            ".tooltip-data"
        ).textContent =
            label;


        elemento.querySelector(
            ".tooltip-valor"
        ).textContent =
            formatarMoeda(valor);


        const posicao =
            chart.canvas.getBoundingClientRect();


        let esquerda =
            posicao.left +
            window.scrollX +
            tooltip.caretX;


        let topo =
            posicao.top +
            window.scrollY +
            tooltip.caretY -
            92;


        const largura =
            180;


        if (
            esquerda + largura >
            window.innerWidth
        ) {

            esquerda =
                window.innerWidth -
                largura -
                20;

        }


        if (
            esquerda < 20
        ) {

            esquerda =
                20;

        }


        if (
            topo < 20
        ) {

            topo =
                posicao.top +
                window.scrollY +
                tooltip.caretY +
                20;

        }


        elemento.style.left =
            `${esquerda}px`;


        elemento.style.top =
            `${topo}px`;


        elemento.style.opacity =
            "1";


        elemento.style.transform =
            "translateY(0)";

    }

},


                scales: {

                    x: {

                        border: {

                            display:
                                false
                        },

                        grid: {

                            display:
                                false
                        },

                        ticks: {

                            color:
                                function() {

                                    return obterCores().texto;

                                },

                            font: {

                                family:
                                    "Inter",

                                size:
                                    11,

                                weight:
                                    "500"
                            },

                            padding:
                                8,

                            maxTicksLimit:
                                8
                        }

                    },


                    y: {

                        beginAtZero:
                            true,

                        grace:
                            "8%",

                        border: {

                            display:
                                false
                        },

                        grid: {

                            color:
                                function() {

                                    return obterCores().grade;

                                },

                            drawTicks:
                                false
                        },

                        ticks: {

                            color:
                                function() {

                                    return obterCores().texto;

                                },

                            padding:
                                10,

                            maxTicksLimit:
                                6,

                            font: {

                                family:
                                    "Inter",

                                size:
                                    11,

                                weight:
                                    "500"
                            },


                            callback:
                                function(valor) {

                                    if (
                                        valor >= 1000000
                                    ) {

                                        return "R$ " +
                                            (
                                                valor /
                                                1000000
                                            ).toFixed(1) +
                                            "M";

                                    }


                                    if (
                                        valor >= 1000
                                    ) {

                                        return "R$ " +
                                            (
                                                valor /
                                                1000
                                            ).toFixed(1) +
                                            "k";

                                    }


                                    return "R$ " +
                                        valor;

                                }

                        }

                    }

                }


            },

            plugins: [

                linhaVertical

            ]

        }
    );


// ==========================================
// ATUALIZAR OS INDICADORES
// ==========================================

function atualizarKPIs(valores) {

    const total =
        valores.reduce(
            function(soma, valor) {

                return soma + valor;

            },
            0
        );


    const media =
        total /
        valores.length;


    totalAcumulado.textContent =
        formatarMoeda(total);


    mediaDiaria.textContent =
        formatarMoeda(media);


    let crescimentoValor =
        0;


    if (valores.length > 1) {

        crescimentoValor =
            (
                (
                    valores[valores.length - 1]
                    -
                    valores[0]
                )
                /
                valores[0]
            )
            *
            100;

    }


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


// ==========================================
// FILTROS
// ==========================================

botoesFiltro.forEach(

    function(botao) {

        botao.addEventListener(

            "click",

            function() {

                botoesFiltro.forEach(

                    function(item) {

                        item.classList.remove(
                            "ativo"
                        );

                    }

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


// ==========================================
// MODO ESCURO
// ==========================================

botaoTema.addEventListener(

    "click",

    function() {

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


        grafico.update();

    }

);


// ==========================================
// CURSOR DO MOUSE
// ==========================================

canvas.addEventListener(

    "mousemove",

    function() {

        canvas.style.cursor =
            "crosshair";

    }

);


canvas.addEventListener(

    "mouseleave",

    function() {

        canvas.style.cursor =
            "default";

    }

);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarKPIs(
    dados["1D"].valores
);