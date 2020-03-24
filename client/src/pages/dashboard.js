import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTransactions, removeTransaction } from '../store/actions/transactionsAction'
import CreateTransaction from '../components/transactions/CreateTransaction'
import UpdateTransaction from '../components/transactions/UpdateTransaction'


class Dashboard extends Component {


    state = {
        createModalOpen: false,
        updateModalOpen: false,
        id: ''
    }


    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }


    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            id: ''
        })
    }



    componentDidMount() {
        this.props.loadTransactions()
    }



    render() {
        let { auth, transactions } = this.props

        return (
            <div className="row">
                <div className="col-md-8 offset-md-3">
                    <h1>Wellcome {auth.user.name}</h1>
                    <p>Your Email is:{auth.user.email}</p>

                    <button
                        className="btn btn-primary"
                        onClick={this.openCreateModal}
                    >
                        Create New Transactions
                        </button>
                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}

                    />


                    <br />

                    <h1>Transactions:</h1>
                    {transactions.length > 0 ? <ul className='list-group'>
                        {

                            transactions.map(transaction => (
                                <li
                                    key={transaction._id}
                                    className='list-group-item'>

                                    <p>Type: {transaction.type}</p>
                                    <p>Amount: {transaction.amount}</p>

                                    {
                                        this.state.id === transaction._id ?
                                            <UpdateTransaction
                                                isOpen={this.state.updateModalOpen}
                                                close={this.closeUpdateModal}
                                                transaction={transaction}
                                            /> : null
                                    }

                                    <button
                                        onClick={() => this.props.removeTransaction(transaction._id)}
                                        className="btn btn-danger">
                                        Remove
                                 </button>

                                    <button
                                        onClick={() => this.openUpdateModal(transaction._id)}
                                        className="btn btn-success">
                                        Update
                                </button>
                                </li>
                            ))
                        }
                    </ul> : <p>There is no transaction</p>}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { loadTransactions, removeTransaction })(Dashboard)



