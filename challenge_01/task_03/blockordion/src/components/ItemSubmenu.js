import {DropdownMenu} from "@wordpress/components";
import {
	arrowUp,
	arrowDown,
	moreVertical,
	trash
} from '@wordpress/icons';

function ItemSubmenu(props) {
	const {
		addItemAbove,
		addItemBelow,
		deleteItem
	} = props;

	return (
		<DropdownMenu
			className=""
			icon={moreVertical}
			label="Settings"
			controls={[
				{
					title: 'Add New Item Above',
					icon: arrowUp,
					onClick: addItemAbove,
				},
				{
					title: 'Add New Item Below',
					icon: arrowDown,
					onClick: addItemBelow,
				},
				{
					title: 'Delete Current Item',
					icon: trash,
					onClick: deleteItem,
				}
			]}
		/>
	);
}

export {ItemSubmenu};
