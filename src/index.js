import "./index.scss";

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

  },
  edit: EditComponent,
  save: function () {
    return null
  }
})



function EditComponent(props) {

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

  if(props.attributes.adultListsLoaded == "loaded" && props.attributes.teenListsLoaded == "loaded" && props.attributes.youthListsLoaded == "loaded") 
  {

    return (
      <div className="featured-mppl-list-wrapper">
        <div className="list-select-container">
         <select onChange={e => {
          props.setAttributes({listId: e.target.value})
        }}>
          <option disable="true" selected="true" value="none">Choose an Adult list</option>
						{ props.attributes.adultLists.map(function(x) { return makeOptions("adultlists",x); })}
         </select>
        </div>

        <div className="list-select-container">
         <select onChange={e => {
          props.setAttributes({listId: e.target.value})
        }}>
          <option disable="true" selected="true" value="none">Choose an Teen list</option>
						{ props.attributes.teenLists.map(function(x) { return makeOptions("teenlists",x); })}
         </select>
        </div>
        <div className="list-select-container">
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