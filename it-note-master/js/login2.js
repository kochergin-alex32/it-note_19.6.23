function renderLoginPage(){//функция отрисовки страницы авторизации
    document.body.innerHTML = "";
    if (isAuth()){
        renderTasksPage();
    } else {
        const loginPage = loginPageMarkup()
      
        document.body.insertAdjacentHTML('afterbegin',loginPage);
  
        document.querySelector('.modal .form-register').addEventListener('submit',function(e){
          e.preventDefault();
          const form = e.target;
          if(!form.checkValidity()){
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
          }
         const name = document.querySelector('.form-register #modal-name').value;
         const email = document.querySelector('.form-register #modal-email').value;
         const password = document.querySelector('.form-register #modal-password').value;
  
          //проверка пароля на длину
          
  
        //   if (password.length >= 4 ) {
        //     console.log("Пароль подходит.");
        //   } else {
        //     console.log("Пароль должен быть больше 4-х символов.");
        //   }
  
  
  
        //  console.log(password);
  
          if(password.length >= 4 ){

              if(registerUser(name, email, password)){
               alert('красава ты зарегался');
               document.body.innerHTML = "";
               renderTasksPage();
              };
          } else{
            // alert("Пароль должен быть больше 4-х символов.");
            console.log(' Пароль должен быть больше 4-х символов!');
            document.querySelector('.form-register .alert-danger')?.remove();
            document.querySelector('.modal .modal-body').insertAdjacentHTML('afterbegin',`
            <div class="login-error alert alert-danger" role="alert">
            Пароль должен быть больше 4-х символов!
                </div>`)
          }






        });


        //показ пароля

var inputPass = document.querySelector('#password');
var iconPass = document.querySelector('#icon-password');
iconPass.addEventListener('click',()=>{
    if(inputPass.getAttribute('type')==='password'){
        inputPass.setAttribute('type','text')
    }else{
        inputPass.setAttribute('type','password')
    }
});

var inpModalPass = document.querySelector('#modal-password');

var iconModalPass = document.querySelector('#icon-modal-password');
iconModalPass.addEventListener('click',()=>{
    if(inpModalPass.getAttribute('type')==='password'){
        inpModalPass.setAttribute('type','text')
    }else{
        inpModalPass.setAttribute('type','password')
    }
   
})

  
        document.querySelector('.form-login')?.addEventListener('submit', function(e){
            e.preventDefault();
           var email = document.querySelector('#email').value;
           var password = document.querySelector('#password').value;
         
        
  
           //проерка на то существуует в ls уже данные или нет, если существуют то берем парсим и сравниваем,а если нет
        if(localStorage.getItem('users')){
            const users = JSON.parse(localStorage.getItem('users'));
            //функция для сравнения пароле и почты вводимых с уже зарегестрироваными в ls также необходимо проверить пусто в ls или нет
          var user =  users.find(function(item){
           
            return email == item.email && password == item.password;
           });
           if(!user){
            document.querySelector('.login-error')?.remove();
            document.querySelector('.login .container').insertAdjacentHTML('afterbegin',`
            <div class="login-error alert alert-danger" role="alert">
            неверно введены логин или пароль!
                </div>`)
           } else {//эта часть рендерит страницу с тасками если пользователь авторизовался(вошел)
            localStorage.setItem('authUser',user.id);
            document.body.innerHTML = "";
            renderTasksPage();
           }
        } else {
        
           document.querySelector('.login-error')?.remove();
            document.querySelector('.login .container').insertAdjacentHTML('afterbegin',`
            <div class="login-error alert alert-danger" role="alert">
            пользователь с такими данными не зареган!
                </div>`);
        }   
        });
      }
  
  }
  
  function registerUser(name, email, password){
  
  //эта достаетмассив с юзерами или пустой создает еси их нет
     var users = JSON.parse(localStorage.getItem('users')) || [];
    //  console.log(111);
    if(users.length > 0){
      //дальше идет сравнение пчты вводимой с уже существующими  и в случае совпадения выдается окночто пользователь с таким мылом уже есть, в противном сучае создает новый объект,пушит его в массив с пользователями и отправляет в LS
    //  console.log(222);
    const isUserInLs = users.find(function(user){
      return user.email == email;
    })
    if(isUserInLs){
      document.querySelector('.form-register .alert-warning')?.remove();
      document.querySelector('.modal .modal-body').insertAdjacentHTML('beforebegin', `<div class="alert alert-warning" role="alert">
      Пользователь с таким мылом уже есть!
     </div>`)
     return false;
    }else{
      const id = users[users.length-1].id+1;
      const user = {id, email, password, name};
      users.push(user);
      localStorage.setItem('users',JSON.stringify(users));
  
      localStorage.setItem('authUser', id);
      
      return true;
     
    }
    // дописал эту ветку без неё первый пользователь не мог изначально зарегаться
    } else{
        var users = [];
        const id = users.length+1;
        const user = {id,email,password,name}
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
        localStorage.setItem('authUser', id);
        console.log(user);
        
        return true
    }
  }
  
  function loginPageMarkup(){
  
  
  
    return `<section  class="login">
        
    <div class="container">
        <div class="row text-center">
            <div class="col-12 logo">
                     <i class="bi bi-chat-dots logo"></i>
            </div>
             <div class="col-12 app-name"> it-note</div>
            
        </div>
        <div class="row  col-12 col-sm-6 mx-auto">
            <form class="form-login">
                <div class="mb-3">
                  
                  <input type="email" class="form-control" id="email" name="email" placeholder="введи-ка почту">
                  
                </div>
                <div class="mb-3 pass">
                 
                    <span class="icon-pass" id="icon-password">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          </svg>
                     </span>

                  <input type="password" class="form-control" id="password" name="password" placeholder="введи-ка пароль">
                </div>
               
                <button type="submit" class=" w-100 btn ">войти</button>
                <!-- <button onclick="return false" data-bs-toggle="modal" data-bs-target="#registerModal"  class=" w-100 btn ">зарегаться</button>-->
  
                <button onclick="return false" data-bs-toggle="modal" data-bs-target="#registerModal"  class=" w-100 btn ">зарегаться</button>
              </form>
        </div>
    </div>
  </section>
  
  
  
    <!-- Modal -->
    <div class="modal fade " id="registerModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" >регистрация пользователя</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="form-register needs-validation" novalidate>
                <div class="modal-body">
  
                <div class="mb-3">  
                <input type="text" class="form-control" id="modal-name" name="name" placeholder="введи-ка имя" required>
                
              </div>
  
                <div class="mb-3">
                  <input type="email" class="form-control" id="modal-email" name="email" placeholder="введи-ка почту" required>
                  
                </div>
                <div class="mb-3 pass" >

                <span class="icon-pass" id="icon-modal-password">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                   <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                   <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                 </svg>
            </span>

                  <input type="password" class="form-control " id="modal-password" name="password" placeholder="введи-ка пароль" >
                </div>
               </div>
  
                <div class="modal-footer">
                   <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
  
                   <button  id="register" type="submit" class=" w-100 btn ">зарегаться</button>
                   
                </div>
                </form>
            </div>
        </div>
    </div>
  `;
  
  
  
  
  }
  
  function isAuth(){//функция для авторизации
  if(localStorage.getItem('authUser')){
   return true;
  } else {
    return false;
    }
  }
  
   
  