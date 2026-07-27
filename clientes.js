// ======================================================
// ANIMALLOVER
// CLIENTES.JS
// ======================================================


// ======================================================
// BANCO DE DADOS
// ======================================================

let clientes = JSON.parse(
    localStorage.getItem("clientes")
) || [];


// ======================================================
// MENU CADASTRO
// ======================================================

function abrirCadastro(){

    mostrarPainel("Cadastro",[

        {
            icone:"<span class='material-symbols-rounded'>groups</span>",
            nome:"Clientes",
            funcao:"abrirClientes"
        },

        {
            icone:"<span class='material-symbols-rounded'>pets</span>",
            nome:"Pets",
            funcao:"abrirPets"
        }

    ]);

}


// ======================================================
// CLIENTES
// ======================================================

function abrirClientes(){

    atualizarMenuAtivo("abrirClientes");

    abrirTela(

        "Clientes",

        telaClientes()

    );

}


function telaClientes(){

    return `

        ${campoBusca("Buscar cliente")}

        ${filtroClientes()}

        ${listaClientes()}

        ${botaoNovo("abrirNovoCliente")}

    `;

}


// ======================================================
// FILTROS
// ======================================================

function filtroClientes(){

    return `

        <div class="filtro-clientes">

            <label>

                <input
                    type="radio"
                    name="statusCliente"
                    checked
                >

                Ativos

            </label>

            <label>

                <input
                    type="radio"
                    name="statusCliente"
                >

                Inativos

            </label>

        </div>

    `;

}


// ======================================================
// LISTA
// ======================================================

function listaClientes(){

    if(clientes.length === 0){

        return caixaVazia(

            "Nenhum cliente cadastrado."

        );

    }

    let html = "";

    clientes.forEach((cliente, indice)=>{

        html += cardCliente(

            indice,

            cliente.nome,

            cliente.celular

        );

    });

    return html;

}

// ======================================================
// NOVO CLIENTE
// ======================================================

function abrirNovoCliente(){

    abrirTela(

        "Novo Cliente",

        telaNovoCliente()

    );

}


function telaNovoCliente(){

    return `

        <div class="formulario">

            ${tituloSecao("Dados do Tutor")}

            ${campoTexto(
                "Nome completo",
                "nomeCliente",
                "Digite o nome completo"
            )}

            ${campoTexto(
                "Celular",
                "celularCliente",
                "(21) 99999-9999",
                "tel"
            )}

            ${campoTexto(
                "Telefone adicional",
                "telefoneCliente",
                "(21) 99999-9999",
                "tel"
            )}

            ${campoTexto(
                "CPF",
                "cpfCliente",
                "000.000.000-00"
            )}

            ${campoTexto(
                "E-mail",
                "emailCliente",
                "email@exemplo.com",
                "email"
            )}

            ${separador()}

            ${tituloSecao("Endereço")}

            ${campoTexto(
                "CEP",
                "cep",
                "00000-000",
                "text",
                'onblur="buscarCEP()"'
            )}

            ${campoTexto(
                "Rua",
                "rua",
                "Nome da rua"
            )}

            ${campoTexto(
                "Número",
                "numero",
                "Número"
            )}

            ${campoTexto(
                "Complemento",
                "complemento",
                "Apartamento, bloco..."
            )}

            ${campoTexto(
                "Bairro",
                "bairro",
                "Bairro"
            )}

            ${campoTexto(
                "Cidade",
                "cidade",
                "Cidade"
            )}

            ${campoTexto(
                "Estado",
                "estado",
                "UF"
            )}

            ${botao(
                "Salvar Cliente",
                "salvarCliente()"
            )}

        </div>

    `;

}

// ======================================================
// SALVAR CLIENTE
// ======================================================

function salvarCliente(){

    const nome = document.getElementById("nomeCliente").value.trim();
    const celular = document.getElementById("celularCliente").value.trim();
    const telefone = document.getElementById("telefoneCliente").value.trim();
    const cpf = document.getElementById("cpfCliente").value.trim();
    const email = document.getElementById("emailCliente").value.trim();

    const cep = document.getElementById("cep").value.trim();
    const rua = document.getElementById("rua").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const complemento = document.getElementById("complemento").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const estado = document.getElementById("estado").value.trim();

    if(nome === ""){

        alert("Informe o nome do cliente.");
        return;

    }

    if(celular === ""){

        alert("Informe o celular do cliente.");
        return;

    }

    const cliente = {

        nome,
        celular,
        telefone,
        cpf,
        email,

        endereco:{

            cep,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado

        },

        ativo:true,
        pets:[],
        criadoEm:new Date().toISOString()

    };

    clientes.push(cliente);

    localStorage.setItem(

        "clientes",

        JSON.stringify(clientes)

    );

    abrirClientes();

}



// ======================================================
// FICHA DO CLIENTE
// ======================================================

function abrirFichaCliente(id){

    const cliente = clientes[id];

    alert(

        `Cliente: ${cliente.nome}

Celular: ${cliente.celular}

Pets cadastrados: ${cliente.pets.length}`

    );

}

// ======================================================
// BUSCAR CEP
// ======================================================

async function buscarCEP(){

    const cep = document
        .getElementById("cep")
        .value
        .replace(/\D/g, "");

    if(cep.length !== 8){
        return;
    }

    try{

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const dados = await resposta.json();

        if(dados.erro){

            alert("CEP não encontrado.");

            return;

        }

        document.getElementById("rua").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        document.getElementById("cidade").value = dados.localidade;
        document.getElementById("estado").value = dados.uf;

    }catch(error){

        console.error(error);
        alert("Erro ao consultar o CEP.");

    }

}

// ======================================================
// LIMPAR CLIENTES
// ======================================================

function limparClientes(){

    if(

        !confirm(

            "Deseja realmente apagar todos os clientes?"

        )

    ){

        return;

    }

    localStorage.removeItem("clientes");

    clientes = [];

    abrirClientes();

}