import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getAllUser } from "../redux/action/userAction"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { setHeader } from '../redux/action/headerAction'
import "./users.css"
const Users = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    useEffect(async () => {
        await dispatch(getAllUser());
        await dispatch(setHeader("สมาชิกทั้งหมด"));
    }, [])

    const sizePerPageOptionRenderer = ({
        text,
        page,
        onSizePerPageChange
    }) => (
        <li
            key={text}
            role="presentation"
            className="dropdown-item"
        >
            <a
                href="#"
                tabIndex="-1"
                role="menuitem"
                data-page={page}
                onMouseDown={(e) => {
                    e.preventDefault();
                    onSizePerPageChange(page);
                }}
                style={{ color: 'red' }}
            >
                {text}
            </a>
        </li>
    );

    const columns = [
        {
            dataField: 'i',
            text: '#',
        },
        {
            dataField: 'firstname',
            text: 'ชื่อจริง',
        },
        {
            dataField: 'lastname',
            text: 'นามสกุล',
        },
        {
            dataField: 'email',
            text: 'อีเมล'
        },
        {
            dataField: 'phone',
            text: 'เบอร์โทร'
        },
        {
            dataField: 'id',
            text: 'รายการซื้อ',
            formatter: (cell, row) => <a href={"/user/" + cell} class="btn btn-sm btn-info">
                ดูเพิ่มเติม
            </a>
        },
        {
            dataField: 'id',
            text: 'รายการถูกรางวัล',
            formatter: (cell, row) => <a href={"/user/reward/" + cell} class="btn btn-sm btn-info">
                ดูเพิ่มเติม
            </a>
        }

    ];

    const { SearchBar } = Search;
    const options = {
        custom: true,
        paginationSize: 4,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        totalSize: user.data.length
      };

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>

            <ToolkitProvider
                keyField="id"
                columns={columns}
                data={user.data}
                search
            >
                
                {
                    toolkitprops => (
                        <div>
                            <div className="tool-search-table">
                               
                                    <SearchBar {...toolkitprops.searchProps} />
                       
 
                                    <PaginationListStandalone {...paginationProps} />
         

                            </div>


                            <BootstrapTable
                                bordered={false}
                                hover
                                {...toolkitprops.baseProps}
                                {...paginationTableProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    );



    return (
        <div>
            <div className="card">
                <div className="card-header border-transparent ">
                    <h2 className="card-title pt-2">ข้อมูลสมาชิก</h2>
                </div>
                <div className="card-body p-3">
                    <PaginationProvider
                        pagination={paginationFactory(options)
                        }
                    >
                        {/* <PaginationListStandalone
                                            
                                        />
                        <ToolkitProvider
                            keyField="id"
                            data={user.data}
                            columns={columns}
                            search={{ defaultSearch: '' }}
                        >


                            {
                                props => (
                                    <div className="p-3">
                                       
                                        <SearchBar {...props.searchProps} />
                                        <hr />
                                        <BootstrapTable
                                            bordered={false}
                                            hover
                                            // pagination={paginationFactory()}
                                            {...props.baseProps}
                                        />
                                    </div>
                                )
                            }

                        </ToolkitProvider> */}

                        {contentTable}
                    </PaginationProvider>
                </div>
            </div>


        </div>
    )
}

export default Users
