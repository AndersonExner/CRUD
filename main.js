
// PAGINA INDEX SCRIPTS

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbUsers')) ?? [];
const setLocalStorage = (dbUsers) => localStorage.setItem("dbUsers", JSON.stringify(dbUsers));
const getUserLog = () => JSON.parse(localStorage.getItem('userLogado'));
const setUserLog = (userLogado) => localStorage.setItem('userLogado', JSON.stringify(userLogado));

document.addEventListener('DOMContentLoaded', () => {
	const h1 = document.getElementById('h1');
	let logado = getUserLog();
	if(!logado){
		alert("Você não está logado!!!");
		location.href = 'login.html';
	}
	const texto = document.createTextNode(`Bem vindo ${nomeLogin().toUpperCase()}`);
	h1.appendChild(texto)
	montarRecados();
})

//PEGAR NOME DO USUARIO LOGADO
const nomeLogin = () => {
	const userLogado = getUserLog();
	for (const i of userLogado) {
		return i.Nome;
	}
}

//PEGAR VETOR DE RECADOS DO USUARIO LOGADO

const recadosUser = () => {
	const userLogado = getUserLog();
	for (const i of userLogado) {
		return i.ListaRecados;
	}
}

//SALVAR ALTERAÇOES NO BANCO ORIGINAL
function salvar(){

	const dbUsers = getLocalStorage();
	
	const indexUser = dbUsers.findIndex((element) => {
		return element.Nome === nomeLogin();
	})
		
	dbUsers.splice(indexUser, 1);
	setLocalStorage(dbUsers);

	const userLogado = getUserLog();

	for (const i of userLogado) {
		const user = {
			Nome: i.Nome,
			Senha: i.Senha,
			ListaRecados: i.ListaRecados
		}
		dbUsers.push(user);
		setLocalStorage(dbUsers);
	}
}	

//FUNCAO LOGOFF SALVANDO TUDO NO BANCO ORIGINAL

function logoff() {
	salvar();
	localStorage.removeItem('userLogado');
	location.href = 'login.html';
}

//NOVO RECADO

function newMessage(){
	const userLogado = getUserLog();
	let mensagem = document.getElementById('Message').value;
	let descricao = document.getElementById('Descricao').value;

	if(!mensagem || !descricao){
		alert("Campos não preenchidos");
		return
	}
	
	const recado = {
		desc: descricao,
		mensagem: mensagem
	}

let Recados = recadosUser();

	Recados.unshift(recado);
	for (const user of userLogado) {
		user.ListaRecados = Recados;
	}

	setUserLog(userLogado);
	montarRecados();
	resetaCampos();
	salvar();
}

//MONTAR CARDS PERCORRENDO VETOR DE RECADOS

function montarRecados(){
	const userLogado = getUserLog();
	
	for (const i of userLogado) {
		Recados = i.ListaRecados;
	}
	
	const tabelaRecados = document.getElementById('tabelaRecados');	
	tabelaRecados.innerHTML = '';

	Recados.forEach((item, index) => {
				
		const trRecado = document.createElement('tr');
		trRecado.setAttribute("class","bounce-in-bottom")
		const tdId = document.createElement('td');
		tdId.setAttribute('id', index);
		tdId.innerText = index + 1;
		trRecado.appendChild(tdId);
		const tdDesc = document.createElement('td');
		tdDesc.innerText = item.desc; 
		trRecado.appendChild(tdDesc);
		const tdMensagem = document.createElement('td');
		tdMensagem.innerText = item.mensagem; 
		trRecado.appendChild(tdMensagem);

		const botaoEditar = document.createElement('button');
		botaoEditar.setAttribute("class","bi bi-pencil m-2");
		botaoEditar.setAttribute("data-bs-toggle","modal");
		botaoEditar.setAttribute("data-bs-target","#modaleditar");
		trRecado.appendChild(botaoEditar);
		botaoEditar.addEventListener('click', () => {
			editarRecado(item);
		});
		
		const botaoApagar = document.createElement('button');
		botaoApagar.setAttribute("class","bi bi-trash");
		trRecado.appendChild(botaoApagar);
		botaoApagar.addEventListener('click', () => {
			apagarDado(index);
		});

		tabelaRecados.appendChild(trRecado);
		resetaCampos();
	});

	//FUNCAO PARA APAGAR RECADOS

	function apagarDado(index){
		
		document.getElementById(`${index}`).remove()
		Recados.splice(index,1);
		for (const i of userLogado) {
			i.ListaRecados = Recados
		}
		setUserLog(userLogado);
		salvar();
		montarRecados();
		
	}
		

	//FUNCAO PARA EDITAR RECADOS

	function editarRecado(item){
	
			
		const novaDesc = document.getElementById('modal_desc');
		novaDesc.setAttribute('value', `${item.desc}`);
		const novotexto = document.getElementById('modal_msg');
		novotexto.setAttribute('value', `${item.mensagem}`);
		const salvar = document.getElementById('salvar');
		const sair = document.getElementById("sair");	
		const modalform = document.getElementById('modal_form');

		salvar.addEventListener('click', () => {
			let descricaoeditado = document.getElementById('modal_desc').value
			let recadoeditado = document.getElementById('modal_msg').value
			if(!descricaoeditado || !recadoeditado){
				alert("Não são permitidos campos vazios");
				modalform.reset();
				montarRecados();
			}else{
			item.desc = descricaoeditado;
			item.mensagem = recadoeditado;
			setUserLog(userLogado);
			montarRecados();
			modalform.reset();
			}
		})

		sair.addEventListener('click', () => {
			montarRecados();
			modalform.reset();
		})
	}
}
//LIMPAR INPUTS
const resetaCampos = () => {
    const form = document.getElementById("inputspadrao");
	form.reset();
}

//FUNCAO ORDENAR POR RECADOS MAIS ANTIGOS
function maisVelho() {
	const linhasNode = document.querySelectorAll('tr');
	
	const tabelaRecados = document.getElementById('tabelaRecados');	
	tabelaRecados.innerHTML = '';

	for( i = linhasNode.length -1 ; i > 0; i--){
		tabelaRecados.appendChild(linhasNode[i]);
	}


}
