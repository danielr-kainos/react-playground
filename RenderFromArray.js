import React from 'react';

var data = [
    {id: 1, name: 'Fake Name'}, {id: 2, name: 'Fake Name'},
    {id: 3, name: 'Fake Name'}, {id: 4, name: 'Fake Name'},
    {id: 5, name: 'Fake Name'}, {id: 6, name: 'Fake Name'},
    {id: 7, name: 'Fake Name'}, {id: 8, name: 'Fake Name'},
    {id: 9, name: 'Fake Name'}, {id: 10, name: 'Fake Name'}
];

class RenderFromArray extends React.Component {
    constructor() {
        super();
        this.state = {data: data}
    }
    render() {
        let rows = this.state.data.map(person => (
            <PersonRow key={person.id} data={person} />
        ));
        // div wrapper just to include <hr /> in the element
        return <div>
            <table>
                <tbody>{rows}</tbody>
            </table>
            <hr />
        </div>
    }
}

const PersonRow = ({data}) => {
    return <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
    </tr>
}

export default RenderFromArray;
