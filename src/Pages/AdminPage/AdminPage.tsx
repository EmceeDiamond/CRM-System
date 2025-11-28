import { Flex, Table, TableColumnsType, Space, Button, Modal, TableProps, Form, Input, Radio, Popover, Typography, Checkbox } from "antd"
import { Roles, User, UserFilters, UserRolesRequest } from "../../Types/Interfase";
import { useCallback, useEffect, useState } from "react";
import { blockUserByAdmin, deleteUserByAdmin, getUsersByAdmin, unblockUserByAdmin, updateUsersRightsByAdmin } from "../../API/adminApi";
import { ArrowRightOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import style from './AdminPage.module.css'
import { refreshAccessToken } from "../../Components/RefreshToken";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const {Title, Paragraph} = Typography;

const AdminPage = () => {

    const navigate = useNavigate()

    const [dataUsersProfile, setDataUsersProfile] = useState<User[]>();
    const [modalWindow, contextHolder] = Modal.useModal()
    const [searchValue, setSearchValue] = useState<string>('');
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        total: 0
    });
    const [accessRights, setAccessRights] = useState<boolean>(true);
    const [usersRigths, setUsersRights] = useState<Roles[]>([Roles.USER]);
    const [parametrsGetRequest, setParametrsGetRequest] = useState<UserFilters>({})

    const dispatch = useDispatch();

    const handleDeleteUser = async(id: number) => {

        try {
            await deleteUserByAdmin(id)
            getUsersProfile(parametrsGetRequest)
        }
        catch(err) {
            const error = err as {status: number} 

            if (error.status === 401){ 
                refreshAccessToken(dispatch)
            }
            console.error(err)
        }
    }

    const handleRepeatConfirmation = (user: User) => {
        modalWindow.confirm({
            title: 'Удалить пользователя',
            content: `Вы действительно хотите удалить пользователя ${user.username}`,
            okText: 'Да, удалить',
            okType: 'danger',
            cancelText: 'Нет',
            onOk(){
                handleDeleteUser(user.id)
            },
            onCancel() {
                console.log('Cancel')
            }
        });
    }

    const handleGetUserProfile = async(id: number) => {
        navigate(`/admin/profile/${id}`)
    }

    const handleSortTable: TableProps<User>['onChange'] = (  
        _pagination,
        _filters,
        sorter) => {

        if (_pagination.current === pagination.current && _pagination.pageSize === pagination.pageSize) {
            if (!Array.isArray(sorter)){
                console.log("=")
                getUsersProfile({
                    sortBy: String(sorter.column?.dataIndex),
                    sortOrder: sorter.order?.includes('asc') ? 'asc' : 'desc'
                })
                setParametrsGetRequest(state => ({
                    ...state,
                    sortBy: String(sorter.column?.dataIndex),
                    sortOrder: sorter.order?.includes('asc') ? 'asc' : 'desc'
                }))
            }
        }

        else {
            console.log(">")
            getUsersProfile({
                page: Number(_pagination.current) - 1
            })

            setParametrsGetRequest(state => ({
                ...state,
                page: Number(_pagination.current) - 1
            }))

            setPagination(state => ({
                ...state,
                current: Number(_pagination.current)
            }))
        }
    }  

    const handleSearchUsers = () => {
        getUsersProfile({
            search: searchValue
        })

        setParametrsGetRequest(state => ({
            ...state,
            search: searchValue
        }))
    }   

    const handleFilterUsers = (selectedFilterValue: string) => {
        getUsersProfile({
            isBlocked: selectedFilterValue === "active" ? false : selectedFilterValue === "blocked" ? true : undefined
        })
        
        setParametrsGetRequest(state => ({
            ...state,
            isBlocked: selectedFilterValue === "active" ? false : selectedFilterValue === "blocked" ? true : undefined
        }))
    }

    const handleBlockOrUnblockUserModalWindow = (user: User) => {
        const userIsBlocked: string = user.isBlocked ? "разблокировать" : "заблокировать"
        modalWindow.confirm({
            title: `Потвердите действие`,
            content: `Вы действительно хотите ${userIsBlocked} пользователя ${user.username}`,
            okText: `Да, ${userIsBlocked}`,
            okType: 'danger',
            cancelText: 'Нет',
            onOk(){
                console.log(user.isBlocked)
                if (user.isBlocked) {
                    console.log(1)
                    handleUnblockUser(user.id) 
                }
                else {
                    handleBlockUser(user.id)
                }
            },
            onCancel() {
                console.log('Cancel')
            }
        });
        
    }

    const handleBlockUser = async(userId: number) => {
        try {
            await blockUserByAdmin(userId)
            getUsersProfile(parametrsGetRequest)
        } 
        catch(err) {
            const error = err as {status: number} 

            if (error.status === 401){ 
                refreshAccessToken(dispatch)
            }
            console.error(err)
        }
    }

    const handleUnblockUser = async(userId: number) => {
        try {
            await unblockUserByAdmin(userId)
            getUsersProfile(parametrsGetRequest)
        } 
        catch(err) {
            const error = err as {status: number} 

            if (error.status === 401){ 
                refreshAccessToken(dispatch)
            }
            console.error(err)
        }
    }

    const handleChangeUsersRights = (rights: Roles[]) => {
        setUsersRights(rights)
    }

    const handleUpdateUsersRightsModalWindow = (user: User) => {

        modalWindow.confirm({
            title: `Изменение прав`,
            content: `Вы действительно хотите изменить права пользователя ${user.username}`,
            okText: `Да`,
            okType: 'danger',
            cancelText: 'Нет',
            onOk(){
                handleUpdateUsersRights(user.id)
            },
            onCancel() {
                console.log('Cancel')
            }
        });
    }

    const handleUpdateUsersRights = async(userId: number) => {
        const userRequsetRights: UserRolesRequest = {
            roles: usersRigths
        }
        try {
            await updateUsersRightsByAdmin(userId, userRequsetRights)
            getUsersProfile(parametrsGetRequest)
        }
        catch(err) {
            const error = err as {status: number} 

            if (error.status === 401){ 
                refreshAccessToken(dispatch)
            }
            console.error(err)
        }
    }

    const columnsUserTable: TableColumnsType<User> = [
        {
            title: 'Имя',
            dataIndex: 'username',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Дата регистрации',
            dataIndex: 'date',
        },
        {
            title: 'Блокировка',
            dataIndex: 'isBlocked',
            render: (value) => (
                <span className={style.isBlockedUser_txt}>{value ? '+' : '-'}</span>
            )
        },
        {
            title: 'Роли',
            dataIndex: 'roles',
            render: (value, record) => (
                <Flex 
                justify="space-between"
                gap="10px">
                    <Paragraph style={{margin: "0"}}>{value.join(" ")}</Paragraph>
                    <Popover content={checkboxGroup(value, record)} trigger="click">
                        <Button icon={<PlusOutlined />} color="cyan" style={{width: "30px"}}/>
                    </Popover>
                </Flex>
            )
        },
        {
            title: 'Номер телефона',
            dataIndex: 'phoneNumber',
        },
        {
            render: (record) => (
                <Space size="middle">
                    <Button variant="outlined" danger icon={<DeleteOutlined />} onClick={() => handleRepeatConfirmation(record)}/>
                    <Button variant="outlined" color="blue" icon={<ArrowRightOutlined />} onClick={() => handleGetUserProfile(record.id)}/>
                    <Button onClick={() => handleBlockOrUnblockUserModalWindow(record)}>{record.isBlocked ? "Разблок" : "Блок"}</Button>
                </Space>
            )
        },
    ];

    const radioGroup = (
        <Radio.Group
        onChange={(e) => {
            console.log(e.target.value)
            handleFilterUsers(e.target.value)
        }}
        defaultValue={'all'}
        style={{ width: '100%' }}
        >
            <Space direction="vertical">
                <Radio value="all">Все пользователи</Radio>
                <Radio value="blocked">Только заблокированные пользователи</Radio>
                <Radio value="active">Только активные пользователи</Radio>
            </Space>
        </Radio.Group>
    );

    const checkboxGroup = (value: Roles[], record: User) => {
        return(
        <Checkbox.Group
        onChange={(e) => {
            handleChangeUsersRights(e)
        }}
        defaultValue={value}
        style={{ width: '100%' }}
        >
            <Space direction="vertical">
                <Checkbox value={Roles.ADMIN}>Admin</Checkbox>
                <Checkbox value={Roles.MODERATOR}>Moderator</Checkbox>
                <Checkbox value={Roles.USER}>User</Checkbox>
            </Space>
            <Button onClick={() => handleUpdateUsersRightsModalWindow(record)}>Применить</Button>
        </Checkbox.Group>)
    };

    const getUsersProfile = useCallback( async(params: UserFilters = {}) => {
        const userTableFilters: UserFilters = {
            search: params.search,
            sortBy: params.sortBy,
            sortOrder: params.sortOrder,
            isBlocked: params.isBlocked,
            limit: params.limit,
            page: params.page
        }
        try {
            const dataUsers = await getUsersByAdmin(userTableFilters);
            setDataUsersProfile(dataUsers.data)
            setPagination(state => ({
                ...state,
                total: dataUsers.meta.totalAmount
            }))
            console.log(dataUsers)
        } 
        catch(err) {
            const error = err as {status: number} 

            if (error.status === 401){ 
                refreshAccessToken(dispatch)
            }
            if (error.status === 403){
                setAccessRights(false)
            }
            console.error(err)
        }
    }, [dispatch])

    useEffect(() => {
        getUsersProfile()
        
    }, [getUsersProfile])
    return (
        <div style={{width: "100%"}}>
            { accessRights ? 
                <Flex className={style.adminPage} vertical >
                    {contextHolder}
                    <Form onFinish={handleSearchUsers}>
                        <Flex justify="flex-end" gap={'20px'}>
                            <Form.Item>
                                <Input 
                                    placeholder="Поиск по имени или email"
                                    prefix={<SearchOutlined />}
                                    className={style.adminPage__input}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onPressEnter={handleSearchUsers}
                                    />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" icon={<SearchOutlined />} className={style.adminPage__search_btn}>Поиск</Button>
                            </Form.Item>
                            <Form.Item>
                                <Popover content={radioGroup} title="Выберите опцию" trigger="click">
                                    <Button className={style.adminPage__filter_btn}>Фильтр</Button>
                                </Popover>
                            </Form.Item>
                        </Flex>
                    </Form>
                    <Table<User>
                        columns={columnsUserTable}
                        dataSource={dataUsersProfile}
                        pagination={pagination}
                        sortDirections={['ascend', 'descend', 'ascend']}
                        onChange={(pagination, filters, sorter, extra) => handleSortTable(pagination, filters, sorter, extra)}>
                        
                    </Table>
                </Flex>
                :
                <Flex vertical className={style.errMessageForUsers}>
                    <Title className={style.errMessageForUsers__title}>Ошибка!!!</Title>
                    <Paragraph className={style.errMessageForUsers__paragraph}>У вас недостаточно прав для просмотра данных страницы.</Paragraph>
                </Flex>
            }
        </div>
    )
}

export default AdminPage;