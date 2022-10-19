import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';

interface ShoppingListTabProps {
    list: ShoppingListDto;
    value: number;
}

const ShoppingListTab = (props: ShoppingListTabProps): JSX.Element => {
    const { value, list } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== list.id}
            id={`shopping-list-tabpanel-${list.id}`}
        >
            {value === list.id && <div>{list.name}</div>}
        </div>
    );
};

export default ShoppingListTab;
