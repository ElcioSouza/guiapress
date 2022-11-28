    const Events = {
        init: function(){
            let formArticle = document.querySelectorAll(".delete-article");
            let formCategory = document.querySelectorAll(".delete-category");
            formArticle.forEach(article => {
                if(article) {
                    article.addEventListener('submit', function (e) {
                        e.preventDefault();
                        let decision = confirm("Você deseja deletar este artigo ?");
                        if (decision) {
                            article.submit();
                        } else {
                            console.log("Não quero deletar, foi um acidente!")
                        }
                    })
                }
            })

            formCategory.forEach(category => {
                if(category) {
                    category.addEventListener('submit', function (e) {
                        e.preventDefault();
                        let decision = confirm("Você deseja deletar está categoria ?");
                        if (decision) {
                            category.submit();
                        } else {
                            console.log("Não quero deletar, foi um acidente!")
                        }
                    })
                }
            })
        }
    }
    const App = {
        init: function(){
            Events.init();
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        App.init();
    });
