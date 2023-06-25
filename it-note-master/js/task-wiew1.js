function renderTaskViewPage(task){
    document.body.innerHTML = '';
    const taskViewPage = `<section class="task-view">
    <div class="container">
        
    </div>
    </section>`
    document.body.insertAdjacentHTML('afterbegin',taskViewPage)
    showTask(task) ;
    
//изменение для сохранения
    document.querySelector('.file-image').addEventListener('change', function(){
        if(this.files && this.files[0]){
            var reader = new FileReader();
            console.log(reader.result);
            reader.onload = function(e){
               
             document.querySelector('.task-image').setAttribute('src',e.target.result);
            
            }
            reader.readAsDataURL(this.files[0]);
        }
    })
     
    
    };
    // функция для отрисовки таски, в таски она подтягивает значения сохраненные в ls
    function showTask(task) {
       
          var card = `
          <div class="arrow">
    
        <!-- <a href=""id="delete-task"><i class="bi bi-x-lg"></i></a>-->
          
          
          <a href=""id="btn-back"> <i class="bi bi-arrow-90deg-left" data-toggle="tooltip" title="вернуться к задачам"></i></a></div>
    
                <div data-id="${task.id}" class="task-card card mx-auto" style="width: 21rem;">
                      <div class="image-edit input-group mb-3">
                     <!-- изменеие пути для сохранения <img  src="img/${task.image}" class="task-image card-img-top">-->
                        <img  src="${task.image}" class="task-image w-img card-img-top">
                        <label class="" for="inputGroupFile01"><i class="bi bi-pencil"></i></label>
                        <input  type="file" class="d-none form-control file-image" id="inputGroupFile01">
                      </div>
                      <div class="card-body">
                        <input type="text" class="task-title card-title form-control fst-italic" value="${task.name}" placeholder="Введите название задачи">
                        <textarea class="task-desc card-text form-control mb-2" placeholder="Введите описание задачи">${task.description}</textarea>
                        <a id="task-save" href="#" class="btn btn-violet d-block py-2">сохранить</a>
                        <a id="delete-task" class="btn btn-danger  w-100"> удалить </a>
                      </div>
                  </div>
          `;
      
          document.querySelector('.task-view .container').insertAdjacentHTML('beforeend',card)
          document.querySelector('#btn-back').addEventListener('click',function(e) {
            e.preventDefault();
            document.body.innerHTML = '';
            renderTasksPage();
          })
          //сохранение изменений в таске
        document.querySelector('#task-save').addEventListener('click',function() {
       
//изменение для сохранения
        var imgSrc = document.querySelector('.task-image');
        const image = imgSrc.src
         console.log(image);


         const name = document.querySelector('.task-title').value;
         const description = document.querySelector('.task-desc').value;
         const id = document.querySelector('.task-card').dataset.id;
         console.log(id,image,name,description);
    
        //  updateTask()
          var tasks = JSON.parse(localStorage.getItem('tasks'));
        const ind = tasks.findIndex(function(item){
            return item.id == id;
         })
         tasks[ind] = {id,name,description,image};
         localStorage.setItem('tasks',JSON.stringify(tasks));
         
         document.querySelector('.task-view .container').insertAdjacentHTML('afterbegin', `
         <div class=" alert alert-info" role="alert">
                   задача сохранена
                       </div>`)
        }) 
        
        document.querySelector('#delete-task').addEventListener('click',function(e){
          e.preventDefault();
          if(confirm('вы уверены')){
           const id =  document.querySelector('.task-card').dataset.id
            var arr = JSON.parse(localStorage.getItem('tasks'));
    
            var newArr = arr.filter(function(task){
             return task.id != id;
            })
            localStorage.setItem('tasks',JSON.stringify(newArr));
            document.body.innerHTML = '';
            renderTasksPage()
           
          }
    
        })
      
    }
    