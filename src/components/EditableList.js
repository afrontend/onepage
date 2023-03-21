import React, {useEffect, useState} from "react";
import styles from '@/styles/EditableList.module.css'

function EditableList({jsonFilename = 'editableList.json'}) {
  const [editableList, setEditableList] = useState([])
  const [resultList, setResultList] = useState({})

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
        {/* <pre>{JSON.stringify(editableList, null, 2)}</pre> */}
        <pre>{JSON.stringify(resultList, null, 2)}</pre>
      </div>
      {editableList.items?.map(item => {
        return <div key={item.id} className={styles.section}>
          {item.type === 'checkbox' &&
            <>
              <input type={item.type} onChange={e => setResultList({...resultList, [item.id]: e.target.value}) }/>
              &nbsp;
              <label htmlFor={item.label} title={item.id}>{item.label}</label>
            </>
          }
          {item.type !== 'checkbox' &&
            <>
              <label htmlFor={item.label} title={item.id}>{item.label}</label>
              &nbsp;
              <input type={item.type} onChange={e => setResultList({...resultList, [item.id]: e.target.value}) }/>
            </>
          }
        </div>
      })}
    </>
  )
}

export default EditableList
