import React from 'react';
import {connect, } from 'react-redux';
import actions, {shapeNames, } from '../../../common/actions.js';
import selectors from '../../common/selectors.js';
import Selector from '../../common/Selector.js';
import FileUpload from './FileUpload/FileUpload.js';
import style from './ShapeSelector.css';

// a context manager
const withUrl = (file, func) => {
    const url = URL.createObjectURL(file);

    try {
        return func(url);
    } finally {
        URL.revokeObjectURL(url);
    }
};

const mapStateToProps = (state) => ({
    shapeSelection: selectors.shapeSelection(state),
    shapeFname: selectors.shapeFname(state),
});

const mapDispatchToProps = (dispatch) => ({
    onShapeChange: (shapeName) => dispatch(actions.shape.updateSelection(shapeName)),
    onFileChange: (fname, data) => dispatch(actions.shape.updateFile(fname, data)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ShapeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();
        this.onShapeChange = this.onShapeChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onShapeChange(shapeName) {
        if (shapeName === shapeNames.FROM_JSON) {
            this.fileUpload.current.prompt();
        }

        this.props.onShapeChange(shapeName);
    }

    onFileChange(file) {
        withUrl(file, (url) => (
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.props.onFileChange(file.name, data))
        ));
    }

    render() {
        const {shapeSelection, shapeFname} = this.props;
        const names = Object.values(shapeNames);
        const labels = [
            'None',
            'Square',
            'Unit circle',
            'Knot',
            'From json',
        ];
        return <div>
            <b>Shape</b><br />
            <div className={style.shapeSelector}>
                <Selector
                    currentValue={shapeSelection}
                    values={names}
                    labels={labels}
                    onChange={this.onShapeChange} />
                <div>
                    {shapeSelection === shapeNames.FROM_JSON && shapeFname}
                </div>
            </div>
            <FileUpload
                ref={this.fileUpload}
                accept='.json'
                onFileChange={this.onFileChange} />
        </div>
    }
}
