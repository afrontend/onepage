import React, {useEffect, useState} from "react";

function EditableList({jsonFilename = 'editableList.json'}) {
  const [editableList, setEditableList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const path = (`${jsonFilename}?` + (new Date()).valueOf())
      const response = await fetch(path);
      const el = await response.json();
      setEditableList(el)
    };
    fetchData();
  }, []);

  if (!editableList) return <div>Loading...</div>

  return (
    <pre>
      {JSON.stringify(editableList, null, 2)}
    </pre>
  )
}

export default EditableList
