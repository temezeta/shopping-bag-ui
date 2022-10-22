import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import ShoppingListsItem from '../shopping-lists-item/ShoppingListsItem';

interface ShoppingListsTableProps {
    shoppingLists: ShoppingListDto[];
}

const ShoppingListsTable = (props: ShoppingListsTableProps): JSX.Element => {
    const { shoppingLists } = props;

    return (
        <div>
            {shoppingLists.map((list, i) => (
                <ShoppingListsItem list={list} key={i} />
            ))}
        </div>
    );
};

export default ShoppingListsTable;
