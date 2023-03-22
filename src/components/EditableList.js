import React, {useEffect, useState} from "react";
import styles from '@/styles/EditableList.module.css'

function EditableList({jsonFilename = 'editableList.json'}) {
  const [editableList, setEditableList] = useState([])
  const [resultList, setResultList] = useState({})

  const toResultList = (items) => {
    const result = {}
    items.forEach(item => {
      result[item.id] = item.defaultValue
    })
    return result;
  }

  useEffect(() => {
    const fetchData = async () => {
      const path = (`${jsonFilename}?` + (new Date()).valueOf())
      const response = await fetch(path);
      const el = await response.json();
      setEditableList(el)
      setResultList(toResultList(el.items))
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
          {item.type === 'text' &&
            <div>
              <label title={item.id}>
                {item.label}
                &nbsp;
                <input type={item.type} value={resultList[item.id]} onChange={e => setResultList({...resultList, [item.id]: e.target.value}) }/>
                &nbsp;
              </label>
            </div>
          }
          {item.type === 'checkbox' &&
            <div>
              <label title={item.id}>
                <input type={item.type} checked={resultList[item.id]} onChange={e => setResultList({...resultList, [item.id]: e.target.checked}) }/>
                &nbsp;
                {item.label}
                &nbsp;
              </label>
            </div>
          }
          {item.type === 'date' &&
            <div>
              <label title={item.id}>
                {item.label}
                &nbsp;
                <input type={item.type} value={resultList[item.id]} onChange={e => setResultList({...resultList, [item.id]: e.target.value}) }/>
                &nbsp;
              </label>
            </div>
          }
          {item.type === 'radio' &&
            item.options.map(option => {
              return <div key={option}>
                <label title={item.id}>
                  <input type={item.type} checked={resultList[item.id] === option} onChange={e => setResultList({...resultList, [item.id]: option}) }/>
                  &nbsp;
                  {option}
                  &nbsp;
                </label>
              </div>
            })
          }
        </div>
      })}
    </>
  )
}

export default EditableList
