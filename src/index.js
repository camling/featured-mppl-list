import "./index.scss";
import {InspectorControls} from "@wordpress/block-editor";
import {PanelBody, PanelRow, ColorPicker, RangeControl} from "@wordpress/components";

wp.blocks.registerBlockType("ourplugin/featured-mppl-list", {
  title: "Featured MPPL List",
  description: "Include a list from our lists and suggestions system",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    listId: {type: "string"},
    adultListsLoaded : {type: "string"},
    adultLists : {type: "array"},
    teenListsLoaded : {type: "string"},
    teenLists : {type: "array"},
    youthListsLoaded : {type: "string"},
    youthLists : {type: "array"},
    backgroundColor : {type : "string", default: "#FFFFFF"},
    columns : {type: "number", default: 4},
    displayCount : {type: "number", default: 0}


  },
  edit: EditComponent,
  save: function () {
    return null
  }
})



function EditComponent(props) {

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

  function radio_button_change(e,list_name)
  {
    let list_name_container = document.querySelectorAll("."+list_name);
    for(let i = 0; i < list_name_container.length; i++)
    {
      list_name_container[i].classList.add("hidden");
      if(list_name_container[i].classList.contains(e.target.id))
      {
        list_name_container[i].classList.remove("hidden");
      }
    }
    console.log(list_name_container);
    console.log(list_name);
    console.log(e);
  }

  function get_lists_array(list_type)
  {
    async function fetchAllLists(list_type) 
    {
      const response = await fetch(`https://mppl.org/list_system/api.php/${list_type}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const lists = await response.json();
      return lists;
    }
    let all_lists = fetchAllLists(list_type);
  
    return all_lists;
  
  }
  
  function makeOptions(database,list)
	{
	  return wp.element.createElement("option", {value: database + "/"+list.list_name}, list.list_name + " - " + list.category);
	}

  if(props.attributes.adultLists == undefined)
  {
    get_lists_array("adultlists").then((lists) => {
      props.setAttributes({adultLists: lists});
      props.setAttributes({adultListsLoaded: "loaded"});
      
    });
  }
 
  if(props.attributes.teenLists == undefined)
  {
  get_lists_array("teenlists").then((lists) => {
    props.setAttributes({teenLists: lists});
    props.setAttributes({teenListsLoaded: "loaded"});
  });
}

if(props.attributes.youthLists == undefined)
  {
  get_lists_array("youthlists").then((lists) => {
    props.setAttributes({youthLists: lists});
    props.setAttributes({youthListsLoaded: "loaded"});
  });
}

  let list_name = makeid(5);

  if(props.attributes.adultListsLoaded == "loaded" && props.attributes.teenListsLoaded == "loaded" && props.attributes.youthListsLoaded == "loaded") 
  {

    return (
      <div className="featured-mppl-list-wrapper" style={{backgroundColor: props.attributes.backgroundColor}}>
       <InspectorControls>
       <PanelBody title="Item Display Count" initialOpen={false}>
       <PanelRow>
            <RangeControl label="limit the number of list items shown. 0 is for all" value={props.attributes.displayCount} onChange={( numbOfItems )=> props.setAttributes({displayCount: numbOfItems})}  min={0} max={30} />
          </PanelRow>
        </PanelBody>
       <PanelBody title="Columns" initialOpen={true}>
       <PanelRow>
            <RangeControl label="Choose number of columns" value={props.attributes.columns} onChange={( numOfCol )=> props.setAttributes({columns: numOfCol})}  min={1} max={4} />
          </PanelRow>
        </PanelBody>
       <PanelBody title="Background Color" initialOpen={false}>
       <PanelRow>
            <ColorPicker color={props.attributes.backgroundColor} onChangeComplete={(color)=> props.setAttributes({backgroundColor: color.hex})}/>
          </PanelRow>
        </PanelBody>
       </InspectorControls>
        <div onChange={(e) =>radio_button_change(e, list_name)}>
          <input type="radio" id="adult_list" name={list_name} value="adult_list"/>
          <label for="adult_list">Adult List</label><br />
          <input type="radio" id="teen_list" name={list_name} value="teen_list"/>
          <label for="teen_list">Teen List</label><br />
          <input type="radio" id="youth_list" name={list_name} value="youth_list"/>
          <label for="youth_list">Youth List</label><br />
        </div>
        <div className={`${list_name} adult_list list-select-container hidden`}>
         <select onChange={e => {
          props.setAttributes({listId: e.target.value})
        }}>
          <option disable="true" selected="true" value="none">Choose an Adult list</option>
						{ props.attributes.adultLists.map(function(x) { return makeOptions("adultlists",x); })}
         </select>
        </div>

        <div className={`${list_name} teen_list list-select-container hidden`}>
         <select onChange={e => {
          props.setAttributes({listId: e.target.value})
        }}>
          <option disable="true" selected="true" value="none">Choose an Teen list</option>
						{ props.attributes.teenLists.map(function(x) { return makeOptions("teenlists",x); })}
         </select>
        </div>
        <div className={`${list_name} youth_list list-select-container hidden`}>
         <select onChange={e => {
          props.setAttributes({listId: e.target.value})
        }}>
          <option disable="true" selected="true" value="none">Choose an Youth list</option>
						{ props.attributes.youthLists.map(function(x) { return makeOptions("youthlists",x); })}
         </select>
        </div>
        <h2 className="list-name-in-editor">
          Display the list: <strong>{props.attributes.listId}</strong> 
        </h2>
      </div>
    )
  }
  
  return <p>Loading ...</p>

  
}