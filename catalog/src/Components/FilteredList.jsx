import { React, useState } from 'react'

function List(props) {
const [records, setRecords] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            setLoading(true);
            const response = await fetch(
              "https://getdocument.azurewebsites.net/api/Documents/"
            );
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setRecords(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        }
        fetchData();
        }, []);
    //create a new array by filtering the original array
    const filteredData = records.filter((record) => {
        //if no input the return the original
        if (props.input === '') {
            return record;
        }
        //return the item which contains the user input
        else {
            return record.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.documentId}>{item.text}</li>
            ))}
        </ul>
    )
}

export default List
