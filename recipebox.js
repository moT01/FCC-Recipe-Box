function closePopup() {
    $('.overlay').css('left', '100%');
    $('.add-form').css('left', '100%');
    $('.edit-form').css('left', '100%');
    $('.overlay').css('opacity', '0');
    $('.add-form').css('opacity', '0');
    $('.edit-form').css('opacity', '0');
};

function clearValues() {
    $('.nameInput').val('');
    $('.ingredientsInput').val('');
    $('.directionsInput').val('');
};

$('.overlay').click(function () {
    closePopup();       
});

var retrievedObject = JSON.parse(localStorage.getItem('storedRecipes')),
    index;

if (retrievedObject === null) {
    retrievedObject = [];
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: retrievedObject
        }; //end this.state
    }; //end constructor
    
    add = (e) => {
        clearValues();
        $('.overlay').css('left', '0');
        $('.add-form').css('left', '3%');
        $('.add-form').css('opacity', '1');
        $('.overlay').css('opacity', '0.7'); 
    };
    
    addSave = (e) => {
        var name = $('#addNameInput').val(),
            ingredients = $('#addIngredientsInput').val().split(','),
            directions = $('#addDirectionsInput').val().split(','),
            recipe = { name: name, ingredients: ingredients, directions: directions };
        closePopup();
        retrievedObject.push(recipe);
        localStorage.setItem('storedRecipes', JSON.stringify(retrievedObject));
        clearValues();
        this.setState({
           recipes: retrievedObject 
        });
    }; //end addSave

    cancel = (e) => {
        closePopup();
    };
    
    edit = (e) => { //brings up the edit menu
        $('.overlay').css('left', '0');
        $('.edit-form').css('left', '3%');
        $('.edit-form').css('opacity', '1');
        $('.overlay').css('opacity', '0.7');
        
        index = e.target.id;
        var name = retrievedObject[index].name,
            ingredients = retrievedObject[index].ingredients.join(),
            directions = retrievedObject[index].directions.join();
        
            $('#editNameInput').val(name);
            $('#editIngredientsInput').val(ingredients);
            $('#editDirectionsInput').val(directions);
    }; //end edit

    editSave = (e) => {
            var name = $('#editNameInput').val(),
            ingredients = $('#editIngredientsInput').val().split(','),
            directions = $('#editDirectionsInput').val().split(',');
        
        retrievedObject[index] = { name: name, ingredients: ingredients, directions: directions };

        closePopup();
        localStorage.setItem('storedRecipes', JSON.stringify(retrievedObject));
        clearValues();
        this.setState({
           recipes: retrievedObject 
        });
    }; //end edit

    delete = (e) => { //when one of the delete buttons is clicked
        var index = e.target.id; //get index of clicked
        retrievedObject.splice(index, 1); //remove clicked from array
        localStorage.setItem('storedRecipes', JSON.stringify(retrievedObject)); //set new array to localStorage
        this.setState({ //set new state
            recipes: retrievedObject
        });
    }; //end delete

    slide = (e) => {
        $(e.target).siblings().last().slideToggle();
    }; //end slide

    render() {
        return(
            <div>
                <div className="main-title">My Recipes</div>
                {this.state.recipes.map((obj, index) => 
                    <div className="flex" key={obj[1]}>
                        <div className="delete-button btn" id={index} onClick={this.delete.bind(this)}>✗</div>
                        <div className="recipe-title btn" onClick={this.slide.bind(this)}>{obj.name}</div>
                        <div className="edit-button btn" id={index} onClick={this.edit.bind(this)}>✎</div>                
                        <div className="recipe-ingredients">
                            <div className="center">ingredients<hr /></div>
                            {obj.ingredients.map((ingredient) =>  <div>{ingredient}</div> )}
                            <br /><br />
                            <div className="center">directions<hr /></div>
                            {obj.directions.map((direction) =>  <div>{direction}</div> )}
                        </div>
                    </div>
                )}
                <div className="add-button btn" onClick={this.add.bind(this)}>✙</div>
                
                <div className="form add-form">
                    <div className="center">ADD RECIPE</div>
                    <div className="center name-wrap">
                        <div className="inline">Name:&nbsp;</div>
                        <input type="text" className="nameInput" id="addNameInput"></input>
                    </div>
                    <div className="center">
                        <div className="inline textarea-wrap">
                            <div>Ingredients, separated by commas:</div>
                            <textarea className="ingredientsInput" id="addIngredientsInput" wrap="off"></textarea><br/>
                        </div>
                        <div className="inline textarea-wrap">
                            <div>Directions, separated by commas:</div>
                            <textarea className="directionsInput" id="addDirectionsInput" wrap="off"></textarea><br/>
                        </div>
                    </div>
                    <br/>
                    <div className="cancel-button btn" onClick={this.cancel.bind(this)}>✗</div>
                    <div className="save-button btn" onClick={this.addSave.bind(this)}>✓</div>
                </div>
                    
               <div className="edit-form form">
                    <div className="center">EDIT RECIPE</div>
                    <div className="center name-wrap">
                        <div className="inline">Name:&nbsp;</div>
                        <input type="text" className="nameInput" id="editNameInput"></input>
                    </div>
                    <div className="center">
                        <div className="inline textarea-wrap">
                            <div>Ingredients, separated by commas:</div>
                            <textarea className="ingredientsInput" id="editIngredientsInput" wrap="off"></textarea><br/>
                        </div>
                        <div className="inline textarea-wrap">
                            <div>Directions, separated by commas:</div>
                            <textarea className="directionsInput" id="editDirectionsInput" wrap="off"></textarea><br/>
                        </div>
                    </div>
                    <br/>
                    <div className="cancel-button btn" onClick={this.cancel.bind(this)}>✗</div>
                    <div className="save-button btn" onClick={this.editSave.bind(this)}>✓</div>
                </div>
                    
            </div>
        ); //end return
    } //end render
} //end Main Component


ReactDOM.render(<Main />, document.getElementById('app'));