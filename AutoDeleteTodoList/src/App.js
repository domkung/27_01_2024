import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
const data = [
  {
    type: 'Fruit',
    name: 'Apple',
  },
  {
    type: 'Vegetable',
    name: 'Broccoli',
  },
  {
    type: 'Vegetable',
    name: 'Mushroom',
  },
  {
    type: 'Fruit',
    name: 'Banana',
  },
  {
    type: 'Vegetable',
    name: 'Tomato',
  },
  {
    type: 'Fruit',
    name: 'Orange',
  },
  {
    type: 'Fruit',
    name: 'Mango',
  },
  {
    type: 'Fruit',
    name: 'Pineapple',
  },
  {
    type: 'Vegetable',
    name: 'Cucumber',
  },
  {
    type: 'Fruit',
    name: 'Watermelon',
  },
  {
    type: 'Vegetable',
    name: 'Carrot',
  },
];
function App() {
  const [dataList, setDataList] = useState(data);
  const distinctTypes = [...new Set(data.map(item => item.type))];
  const [newData, setNewData] = useState([]);
  const setListData = (items) => {
    let list = [];
    items.map(item => {
      list.push({
        "type": item,
        "data": []
      });
    });
    setNewData(list);
  }
  const moveData = (item, i) => {
    let index = newData.findIndex(def => def.type === item.type);
    let def = newData.find(def => def.type === item.type);
    let name = item.name;
    setTimeout(() => {
      if (!dataList.find((list) => list.name === name) && newData[index].data[0] === name) {
        dataList.push({
          type: item.type,
          name: item.name
        });
        newData[index].data.splice(0, 1);
        setNewData([
          ...newData,
        ]);
      }
    }, 5000);
    def.data.push(item.name);
    newData[index] = def;
    dataList.splice(i, 1);

    setNewData([
      ...newData,
    ]);
  }
  const popItem = (index, name, i) => {
    if (newData[index].data.find(list => list === name) && !dataList.find((list) => list.name === name)) {
      dataList.push({
        type: newData[index].type,
        name: name
      });
      newData[index].data.splice(i, 1);
      setNewData([
        ...newData,
      ]);
    }
  }
  useEffect(() => {
    setListData(distinctTypes);
  }, []);
  return (
    <Container>
      <Row xs={3} className="row-with-margin" >
        <Col>
          <div>
            {dataList.map((item, index) => (
              <div className="item" onClick={() => moveData(item, index)}>{item.name}</div>
            ))}
          </div>
        </Col>
        {newData.map((item, index) => (
          <Col>
            <div className='table-list'>
              <div class="item-head">
                {item.type}
              </div>
              {item.data.map((list, i) => (
                <div class='p-1'>
                  <div className="item" onClick={() => popItem(index, list, i)}>{list}</div>
                </div>
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
