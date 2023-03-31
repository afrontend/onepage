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

  function handleReset() {
      setResultList(toResultList(editableList.items))
  }

  return (
    <>
      <div className={styles.section}>
        {/* <pre>{JSON.stringify(editableList, null, 2)}</pre> */}
        <pre className={styles.textarea}>{JSON.stringify(resultList, null, 2)}</pre>
        <button onClick={handleReset}>Reset</button>
        <div>
          {editableList.items?.map(item => {
            return <div key={item.id} className={styles.section}>
              {['text', 'search', 'password'].includes(item.type) &&
                <div>
                  <label title={item.id}>
                    {item.label}
                    <input type={item.type} value={resultList[item.id]}
                      required
                      minLength={'min' in item ? item.min : "" }
                      maxLength={'max' in item ? item.max : "" }
                      onChange={e => setResultList({
                        ...resultList,
                        [item.id]: e.target.value})
                      }/>
                    <div className="errorMsg">
                      ({'min' in item && <span>{item.min}</span>}
                      &nbsp;~&nbsp;
                      {'max' in item && <span>{item.max} </span>}chars)
                    </div>
                  </label>
                </div>
              }
              {item.type === 'checkbox' &&
                <div>
                  <label title={item.id}>
                    <input type={item.type} checked={resultList[item.id]} onChange={e => setResultList({...resultList, [item.id]: e.target.checked}) }/>
                    {item.label}
                  </label>
                </div>
              }
              {item.type === 'date' &&
                <div>
                  <label title={item.id}>
                    {item.label}
                    <input type={item.type} value={resultList[item.id]}
                      onChange={e => setResultList({...resultList, [item.id]: e.target.value}) }
                      min={item.min}
                      max={item.max}
                    />
                    <div className="errorMsg">
                      ({'min' in item && <span>{item.min}</span>}
                      &nbsp;~&nbsp;
                      {'max' in item && <span>{item.max}</span>})
                    </div>
                  </label>
                </div>
              }
              {item.type === 'radio' &&
                item.options.map(option => {
                  return <div key={option.value}>
                    <label title={item.id}>
                      <input type={item.type} checked={resultList[item.id] === option.value} onChange={() => setResultList({...resultList, [item.id]: option.value}) }/>
                      {option.label} ({option.value})
                    </label>
                  </div>
                })
              }
              {item.type === 'number' &&
                <div>
                  <label title={item.id}>
                    {item.label}
                    <input type={item.type} value={resultList[item.id]}
                      onChange={e => setResultList({...resultList, [item.id]: Number(e.target.value)}) }
                      min={item.min}
                      max={item.max}
                    />
                    <div className="errorMsg">
                      {'min' in item && <span>({item.min}</span>}
                      &nbsp;~&nbsp;
                      {'max' in item && <span>{item.max})</span>}
                    </div>
                  </label>
                </div>
              }
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default EditableList
