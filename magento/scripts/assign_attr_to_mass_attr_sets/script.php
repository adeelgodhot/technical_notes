<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$ATTRIBUTE_CODE = 'my_attribute';
$ATTRIBUTE_GROUP = 'General';

use Magento\Framework\App\Bootstrap;
require __DIR__ . '/../app/bootstrap.php';

$bootstrap = Bootstrap::create(BP, $_SERVER);

$objectManager = $bootstrap->getObjectManager();
$state = $objectManager->get(Magento\Framework\App\State::class);
$state->setAreaCode('adminhtml');

$ATTRIBUTE_GROUP = 'Product Details';
$ATTRIBUTE_CODE = 'sku_m';
/* Attribute assign logic */
$eavSetup = $objectManager->create(\Magento\Eav\Setup\EavSetup::class);
$config = $objectManager->get(\Magento\Catalog\Model\Config::class);
$attributeManagement = $objectManager->get(\Magento\Eav\Api\AttributeManagementInterface::class);

$entityTypeId = $eavSetup->getEntityTypeId(\Magento\Catalog\Model\Product::ENTITY);
$attributeSetIds = $eavSetup->getAllAttributeSetIds($entityTypeId);
foreach ($attributeSetIds as $attributeSetId) {
    if($attributeSetId == 4) continue;
    if ($attributeSetId) {
        echo "{$attributeSetId}--Start" . PHP_EOL;
        $group_id = $config->getAttributeGroupId($attributeSetId, $ATTRIBUTE_GROUP);
        $attributeManagement->assign(
            'catalog_product',
            $attributeSetId,
            $group_id,
            $ATTRIBUTE_CODE,
            999
        );
        echo "{$attributeSetId}--Done" . PHP_EOL;
    }
}
