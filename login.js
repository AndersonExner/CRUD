
//LocalStorage variaveis para GET e SET
const getLocalStorage = () => JSON.parse(localStorage.getItem('dbUsers')) ?? [];
const setLocalStorage = (dbUsers) => localStorage.setItem("dbUsers", JSON.stringify(dbUsers));
const setUserLog = (userLogado) => localStorage.setItem('userLogado', JSON.stringify(userLogado));

//CRIANDO USUARIOS - INFORMAÇOES

//funçao para novo cadastro
const newUser = () => {
	const userName = document.getElementById("userName").value;
	const userPass = document.getElementById("userPass").value;
	const userPassConfirm = document.getElementById("userPassNewConfirm").value;
	
	if(validName(userName)){
		if(userPass === userPassConfirm && userName != "" && userPass != ""){
			const recados = [];
			const user = {
				Nome: userName,
				Senha: userPass,
				ListaRecados: recados
			}
			createUser(user);
			alert("Cadastrado Com Sucesso");
			loginUser()
		}else{
			alert("Dados Inválidos");
		}
	}
}	

//função para validar nome do usuário
const validName = (userName) => {
	const dbUsers = getLocalStorage();
	
	const existe = dbUsers.some((usuario) => {
		return usuario.Nome === userName;
	})

	if(existe){
		alert('Usuário ja cadastrado');
		return false;
	}else{
		return true;
	}
}
//}
//CRIANDO USUARIO NO BANCO
const createUser = (user) => {
    const dbUsers = getLocalStorage();
    dbUsers.push (user);
    setLocalStorage(dbUsers);
}

//LOGANDO USUARIO
const loginUser = () => {
	const userName = document.getElementById("userName").value;
	const userPass = document.getElementById("userPass").value;
	const dbUsers = getLocalStorage();
	
	const login = dbUsers.some((user) => {
        return user.Nome === userName && user.Senha === userPass
    });
	
	if(login){
		userLog(userName)
		location.href = 'index.html';
	}else{
		alert("Usuário não encontrado/Senha inválida")
	}
}

//USUARIO LOCAL STORAGE

const userLog = (user) => {
	const dbUsers = getLocalStorage();
		
	const userLogado = dbUsers.filter((element) => {
		return element.Nome === user
	})

	setUserLog(userLogado);

}




