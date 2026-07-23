// ======================================================
// ANIMALLOVER
// CLIENTES.JS
// ------------------------------------------------------
// Cadastro e gerenciamento de clientes
// ======================================================



// ======================================================
// BANCO DE DADOS LOCAL
// ======================================================

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];



// ======================================================
// MENU CADASTRO
// ======================================================

function abrirCadastro(){

    mostrarPainel("Cadastro",[

        {
            icone:"👤",
            nome:"Clientes",
            funcao:"abrirClientes"
        },

        {
            icone:"🐶",
            nome:"Pets",
            funcao:"abrirPets"
        }

    ]);

}



// ======================================================
// CLIENTES
// ======================================================

function abrirClientes(){

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
// FILTRO
// ======================================================

function filtroClientes(){

    return `

        <div class="filtro-clientes">

            <label>

                <input
                    type="radio"
                    name="status"
                    checked
                >

                Ativos

            </label>

            <label>

                <input
                    type="radio"
                    name="status"
                >

                Inativos

            </label>

        </div>

    `;

}



// ======================================================
// LISTA DE CLIENTES
// ======================================================

function listaClientes(){

    if(clientes.length === 0){

        return caixaVazia("Nenhum cliente cadastrado.");

    }

    let html = "";

    clientes.forEach(function(cliente, indice){

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

            ${campoTexto(
                "Nome",
                "nomeCliente",
                "Digite o nome completo"
            )}

            ${campoTexto(
                "Celular",
                "celularCliente",
                "(21) 99999-9999"
            )}

            ${campoTexto(
                "Telefone adicional",
                "telefoneCliente",
                "(21) 99999-9999"
            )}

            ${campoTexto(
                "CPF",
                "cpfCliente",
                "000.000.000-00"
            )}

            ${campoTexto(
                "E-mail",
                "emailCliente",
                "email@exemplo.com"
            )}

            ${separador()}

            ${campoTexto(
                "CEP",
                "cep",
                "00000-000",
                'onblur="buscarCEP()"'
            )}

            ${campoTexto(
                "Endereço",
                "rua",
                "Ex: Av. Brasil, 123"
            )}

            ${campoTexto(
                "Número",
                "numero",
                "Número"
            )}

            ${campoTexto(
                "Complemento",
                "complemento",
                "Apartamento, bloco, etc."
            )}

            ${campoTexto(
                "Bairro",
                "bairro",
                "Digite o bairro"
            )}

            ${campoTexto(
                "Cidade",
                "cidade",
                "Digite a cidade"
            )}

            ${campoTexto(
                "Estado",
                "estado",
                "UF"
            )}

            ${separador()}

            ${campoTextarea(
                "Observações",
                "observacoes",
                "Ex: Cliente prefere contato por WhatsApp"
            )}

            ${campoSelect(
                "Como conheceu a Animallover",
                "origem",
                [
                    "Instagram",
                    "Facebook",
                    "Google",
                    "WhatsApp",
                    "Indicação",
                    "Outro"
                ]
            )}

            <button
                class="botao"
                onclick="salvarCliente()"
            >

                Salvar

            </button>

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

    const observacoes = document.getElementById("observacoes").value.trim();

    const origem = document.getElementById("origem").value;

    if(nome === ""){

        alert("Informe o nome do cliente.");

        return;

    }

    if(celular === ""){

        alert("Informe o celular do cliente.");

        return;

    }

const existe = clientes.some(cliente =>
    cliente.cpf === cpf && cpf !== ""
);

if(existe){

    alert("Já existe um cliente cadastrado com esse CPF.");

    return;

}

    const cliente = {

        nome,
        celular,
        telefone,
        cpf,
        email,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        observacoes,
        origem

    };

    clientes.push(cliente);

    localStorage.setItem(

        "clientes",

        JSON.stringify(clientes)

    );
    alert("Cliente cadastrado com sucesso!");
    abrirClientes();

}



// ======================================================
// FICHA DO CLIENTE
// ======================================================

function abrirFichaCliente(id){

    alert(

        "Abrindo ficha de " +

        clientes[id].nome

    );

}



// ======================================================
// BUSCAR CEP
// ======================================================

async function buscarCEP(){

    const cep = document
        .getElementById("cep")
        .value
        .replace(/\D/g,"");

    if(cep.length !== 8){

        return;

    }

    try{

        const resposta = await fetch(

            "https://viacep.com.br/ws/" +

            cep +

            "/json/"

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

    }

    catch{

        alert("Erro ao consultar o CEP.");

    }

}



// ======================================================
// LIMPAR CLIENTES
// ======================================================

function limparClientes(){

    if(!confirm("Deseja realmente apagar todos os clientes?")){

        return;

    }

    localStorage.removeItem("clientes");

    clientes = [];

    abrirClientes();

}