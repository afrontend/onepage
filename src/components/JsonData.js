import React, {useEffect, useState} from "react";

export function JsonData({jsonFilename = 'some.json'}) {
  const [APIList, setAPIList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const path = (`${jsonFilename}?` + (new Date()).valueOf())
      const response = await fetch(path);
      const apiList = await response.json();
      console.log(apiList)
      setAPIList(apiList)
    };
    fetchData();
  }, []);

  if (!APIList) return <div>Loading...</div>

  return (
    <pre>
      {JSON.stringify(APIList, null, 2)}
    </pre>
  )
}
