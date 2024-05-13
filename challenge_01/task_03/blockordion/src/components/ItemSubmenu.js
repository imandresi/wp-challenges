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

	const menuControls = [
		{
			title: 'Add New Item Above',
			icon: arrowUp,
			onClick: addItemAbove,
		},
		{
			title: 'Add New Item Below',
			icon: arrowDown,
			onClick: addItemBelow,
		}
	];

	if (deleteItem) {
		menuControls.push({
			title: 'Delete Current Item',
			icon: trash,
			onClick: deleteItem,
		})
	}

	return (
		<DropdownMenu
			className=""
			icon={moreVertical}
			label="Settings"
			controls={menuControls}
		/>
	);
}

export {ItemSubmenu};
