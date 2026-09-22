<!DOCTYPE html>
<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Dashboard Financeiro</title>

    <!-- Fonte Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
    >

    <!-- Nosso CSS -->
    <link rel="stylesheet" href="css/style.css">

</head>


<body>

    <main class="dashboard">

        <!-- =========================
             CABEÇALHO
        ========================== -->

        <header class="topo">

            <div class="titulo-area">

                <span class="eyebrow">
                    VISÃO GERAL
                </span>

                <h1>
                    Dashboard
                </h1>

                <p>
                    Acompanhe seus resultados em tempo real.
                </p>

            </div>


            <button
                class="botao-tema"
                id="botaoTema"
                type="button"
            >
                🌙
            </button>

        </header>


        <!-- =========================
             CARDS KPI
        ========================== -->

        <section class="kpis">


            <article class="kpi">

                <div class="kpi-topo">

                    <span>
                        Total acumulado
                    </span>

                    <span class="kpi-icone">
                        R$
                    </span>

                </div>

                <strong id="totalAcumulado">
                    R$ 0,00
                </strong>

                <p class="kpi-info">
                    Volume total do período
                </p>

            </article>


            <article class="kpi">

                <div class="kpi-topo">

                    <span>
                        Média diária
                    </span>

                    <span class="kpi-icone">
                        ↗
                    </span>

                </div>

                <strong id="mediaDiaria">
                    R$ 0,00
                </strong>

                <p class="kpi-info">
                    Média de movimentação
                </p>

            </article>


            <article class="kpi">

                <div class="kpi-topo">

                    <span>
                        Crescimento
                    </span>

                    <span class="kpi-badge positivo">
                        +0%
                    </span>

                </div>

                <strong id="crescimento">
                    +0,0%
                </strong>

                <p class="kpi-info">
                    Comparação com período anterior
                </p>

            </article>


        </section>


        <!-- =========================
             GRÁFICO
        ========================== -->

        <section class="grafico-card">


            <div class="grafico-topo">


                <div>

                    <span class="eyebrow">
                        DESEMPENHO
                    </span>

                    <h2>
                        Fluxo financeiro
                    </h2>

                    <p>
                        Acompanhe a evolução dos seus resultados.
                    </p>

                </div>


                <!-- FILTROS -->

                <div class="filtros">

                    <button
                        class="filtro ativo"
                        data-periodo="1D"
                        type="button"
                    >
                        1D
                    </button>

                    <button
                        class="filtro"
                        data-periodo="7D"
                        type="button"
                    >
                        7D
                    </button>

                    <button
                        class="filtro"
                        data-periodo="1M"
                        type="button"
                    >
                        1M
                    </button>

                    <button
                        class="filtro"
                        data-periodo="1A"
                        type="button"
                    >
                        1A
                    </button>

                    <button
                        class="filtro"
                        data-periodo="Tudo"
                        type="button"
                    >
                        Tudo
                    </button>

                </div>


            </div>


            <!-- ÁREA DO GRÁFICO -->

            <div class="grafico-area">

                <canvas id="meuGrafico"></canvas>

            </div>


        </section>


    </main>


    <!-- Chart.js -->

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


    <!-- Nosso JavaScript -->

    <script src="js/script.js"></script>

</body>

