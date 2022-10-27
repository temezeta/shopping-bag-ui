import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import OrderListItem from '../order-list-item/OrderListItem';

interface OrderListTabProps {
    shoppingLists: ShoppingListDto[];
}

const OrderListTab = (props: OrderListTabProps): JSX.Element => {
    const { shoppingLists } = props;

    return (
        <div>
            {shoppingLists.map((list, i) => (
                <OrderListItem list={list} key={i} />
            ))}
        </div>
    );
};

export default OrderListTab;
