import React, {useEffect, useState} from "react";
import styles from '@/styles/EditableList.module.css'

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
    <>
      <div className={styles.section}>
        <pre>{JSON.stringify(editableList, null, 2)}</pre>
      </div>
      {editableList.items?.map(item => {
        return <div key={item.id} className={styles.section}>
          <label htmlFor={item.label} title={item.id}>{item.label}&nbsp;</label>
          <input type={item.type} />
        </div>
      })}
    </>
  )
}

export default EditableList
