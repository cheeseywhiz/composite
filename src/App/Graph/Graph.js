import {connect, } from 'react-redux';
import selectors from '../common/selectors/selectors.js';
import BaseGraph from './BaseGraph/BaseGraph.js';

const mapStateToProps = (state) => ({
    graphObjects: selectors.graphObjects(state),
});

@connect(mapStateToProps)
export default class Graph extends BaseGraph {
    render() {
        this.scene.clear();
        this.scene.addAll(this.props.graphObjects);
        return super.render();
    }
}
