import {__} from '@wordpress/i18n';
import {InnerBlocks, useBlockProps, BlockControls} from '@wordpress/block-editor';
import {blockEditor} from "../../lib/tools.js";
import {plusCircleFilled} from '@wordpress/icons';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {

	const {
		clientId
	} = props;

	return (

		<section {...useBlockProps()}>
			<BlockControls
				controls={[
					{
						title: 'Add Item',
						icon: plusCircleFilled,
						onClick: () => {
							const block = wp.blocks.createBlock(
								'imandresi/blockordion-plus-blockitem', {}
							);
							blockEditor().insertBlocks(block, 0, clientId);
						}
					}
				]}
			>

			</BlockControls>
			<InnerBlocks
				allowedBlocks={['imandresi/blockordion-plus-blockitem']}
				template={[
					['imandresi/blockordion-plus-blockitem']
				]}
			/>

		</section>
	);
}
