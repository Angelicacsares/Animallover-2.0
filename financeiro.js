// ======================================================
// VENDA
// ======================================================

function abrirVenda(){

    mostrarPainel("Venda",[

        {
            icone:"🛒",
            nome:"Produtos",
            funcao:"abrirVendaProdutos"
        },

        {
            icone:"✂️",
            nome:"Serviços",
            funcao:"abrirVendaServicos"
        }

    ]);

}

// ======================================================
// PRODUTOS
// ======================================================

function abrirVendaProdutos(){

    abrirTela(

        "Venda de Produtos",

        telaVendaProdutos()

    );

}

function telaVendaProdutos(){

    return `

        ${campoBusca("Buscar produto")}

        ${caixaVazia("Nenhum produto cadastrado.")}

    `;

}

// ======================================================
// SERVIÇOS
// ======================================================

function abrirVendaServicos(){

    abrirTela(

        "Venda de Serviços",

        telaVendaServicos()

    );

}

function telaVendaServicos(){

    return `

        ${campoBusca("Buscar serviço")}

        ${caixaVazia("Nenhum serviço cadastrado.")}

    `;

}

// ======================================================
// FINANCEIRO
// ======================================================

function abrirFinanceiro(){

    mostrarPainel("Financeiro",[

        {
            icone:"💰",
            nome:"Contas a Receber",
            funcao:"abrirContasReceber"
        },

        {
            icone:"💸",
            nome:"Despesas",
            funcao:"abrirDespesas"
        },

        {
            icone:"📅",
            nome:"Fechamento Diário",
            funcao:"abrirFechamentoDiario"
        },

        {
            icone:"📆",
            nome:"Fechamento Mensal",
            funcao:"abrirFechamentoMensal"
        },

        {
            icone:"⚠️",
            nome:"Inadimplentes",
            funcao:"abrirInadimplentes"
        },

        {
            icone:"💵",
            nome:"Comissões",
            funcao:"abrirComissoes"
        }

    ]);

}

// ======================================================
// CONTAS A RECEBER
// ======================================================

function abrirContasReceber(){

    abrirTela(

        "Contas a Receber",

        telaContasReceber()

    );

}

function telaContasReceber(){

    return `

        ${campoBusca("Buscar conta")}

        ${caixaVazia("Nenhuma conta cadastrada.")}

    `;

}

// ======================================================
// DESPESAS
// ======================================================

function abrirDespesas(){

    abrirTela(

        "Despesas",

        telaDespesas()

    );

}

function telaDespesas(){

    return `

        ${campoBusca("Buscar despesa")}

        ${caixaVazia("Nenhuma despesa cadastrada.")}

    `;

}

// ======================================================
// FECHAMENTO DIÁRIO
// ======================================================

function abrirFechamentoDiario(){

    abrirTela(

        "Fechamento Diário",

        telaFechamentoDiario()

    );

}

function telaFechamentoDiario(){

    return `

        ${campoBusca("Buscar fechamento")}

        ${caixaVazia("Nenhum fechamento diário encontrado.")}

    `;

}

// ======================================================
// FECHAMENTO MENSAL
// ======================================================

function abrirFechamentoMensal(){

    abrirTela(

        "Fechamento Mensal",

        telaFechamentoMensal()

    );

}

function telaFechamentoMensal(){

    return `

        ${campoBusca("Buscar mês")}

        ${caixaVazia("Nenhum fechamento mensal encontrado.")}

    `;

}

// ======================================================
// INADIMPLENTES
// ======================================================

function abrirInadimplentes(){

    abrirTela(

        "Inadimplentes",

        telaInadimplentes()

    );

}

function telaInadimplentes(){

    return `

        ${campoBusca("Buscar cliente")}

        ${caixaVazia("Nenhum cliente inadimplente.")}

    `;

}

// ======================================================
// COMISSÕES
// ======================================================

function abrirComissoes(){

    abrirTela(

        "Comissões",

        telaComissoes()

    );

}

function telaComissoes(){

    return `

        ${campoBusca("Buscar funcionário")}

        ${caixaVazia("Nenhuma comissão registrada.")}

    `;

}

// ======================================================
// RELATÓRIOS
// ======================================================

function abrirRelatorios(){

    mostrarPainel("Relatórios",[

        {
            icone:"📊",
            nome:"Relatório Financeiro",
            funcao:"abrirRelatorioFinanceiro"
        },

        {
            icone:"📈",
            nome:"Relatório de Clientes",
            funcao:"abrirRelatorioClientes"
        },

        {
            icone:"🐶",
            nome:"Relatório de Pets",
            funcao:"abrirRelatorioPets"
        }

    ]);

}

// ======================================================
// RELATÓRIO FINANCEIRO
// ======================================================

function abrirRelatorioFinanceiro(){

    abrirTela(

        "Relatório Financeiro",

        telaRelatorioFinanceiro()

    );

}

function telaRelatorioFinanceiro(){

    return `

        ${campoBusca("Buscar relatório financeiro")}

        ${caixaVazia("Nenhum relatório encontrado.")}

    `;

}

// ======================================================
// RELATÓRIO DE CLIENTES
// ======================================================

function abrirRelatorioClientes(){

    abrirTela(

        "Relatório de Clientes",

        telaRelatorioClientes()

    );

}

function telaRelatorioClientes(){

    return `

        ${campoBusca("Buscar cliente")}

        ${caixaVazia("Nenhum cliente encontrado.")}

    `;

}

// ======================================================
// RELATÓRIO DE PETS
// ======================================================

function abrirRelatorioPets(){

    abrirTela(

        "Relatório de Pets",

        telaRelatorioPets()

    );

}

function telaRelatorioPets(){

    return `

        ${campoBusca("Buscar pet")}

        ${caixaVazia("Nenhum pet encontrado.")}

    `;

}

// ======================================================
// AJUSTES
// ======================================================

function abrirAjustes(){

    mostrarPainel("Configurações",[

        {
            icone:"👤",
            nome:"Meu Perfil",
            funcao:"abrirMeuPerfil"
        },

        {
            icone:"👥",
            nome:"Usuários",
            funcao:"abrirUsuarios"
        },

        {
            icone:"🛡️",
            nome:"Cargos e Permissões",
            funcao:"abrirPermissoes"
        },

        {
            icone:"🟢",
            nome:"Status das Sessões",
            funcao:"abrirStatusSessoes"
        },

        {
            icone:"💳",
            nome:"Formas de Pagamento",
            funcao:"abrirFormasPagamento"
        },

        {
            icone:"📂",
            nome:"Categorias de Despesas",
            funcao:"abrirCategoriasDespesas"
        },

        {
            icone:"💬",
            nome:"AloverZap",
            funcao:"abrirAloverZap"
        },

        {
            icone:"⚙️",
            nome:"Configurações Gerais",
            funcao:"abrirConfiguracoes"
        },

        {
            icone:"🚪",
            nome:"Sair",
            funcao:"abrirSair"
        }

    ]);

}

// ======================================================
// TELAS DE AJUSTES
// ======================================================

function abrirMeuPerfil(){

    abrirTela(

        "Meu Perfil",

        `${campoBusca("Buscar informação")}
        ${caixaVazia("Nenhuma informação disponível.")}`

    );

}

function abrirUsuarios(){

    abrirTela(

        "Usuários",

        `${campoBusca("Buscar usuário")}
        ${caixaVazia("Nenhum usuário cadastrado.")}`

    );

}

function abrirPermissoes(){

    abrirTela(

        "Cargos e Permissões",

        `${campoBusca("Buscar cargo")}
        ${caixaVazia("Nenhum cargo cadastrado.")}`

    );

}

function abrirStatusSessoes(){

    abrirTela(

        "Status das Sessões",

        `${campoBusca("Buscar sessão")}
        ${caixaVazia("Nenhuma sessão ativa.")}`

    );

}

function abrirFormasPagamento(){

    abrirTela(

        "Formas de Pagamento",

        `${campoBusca("Buscar forma de pagamento")}
        ${caixaVazia("Nenhuma forma de pagamento cadastrada.")}`

    );

}

function abrirCategoriasDespesas(){

    abrirTela(

        "Categorias de Despesas",

        `${campoBusca("Buscar categoria")}
        ${caixaVazia("Nenhuma categoria cadastrada.")}`

    );

}

function abrirAloverZap(){

    abrirTela(

        "AloverZap",

        `${campoBusca("Buscar configuração")}
        ${caixaVazia("Nenhuma configuração disponível.")}`

    );

}

function abrirConfiguracoes(){

    abrirTela(

        "Configurações Gerais",

        `${campoBusca("Buscar configuração")}
        ${caixaVazia("Nenhuma configuração disponível.")}`

    );

}

function abrirSair(){

    alert("O sistema ainda não possui login.");

}