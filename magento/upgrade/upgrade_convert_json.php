<?php
$settings = require(__DIR__.'/../app/etc/env.php');
$database = $settings['db']['connection']['default'];

function isSerialized($value, &$result = null)
{
    // Bit of a give away this one
    if (!is_string($value))
    {
        return false;
    }
    // Serialized false, return true. unserialize() returns false on an
    // invalid string or it could return false if the string is serialized
    // false, eliminate that possibility.
    if ($value === 'b:0;')
    {
        $result = false;
        return true;
    }
    $length = strlen($value);
    $end    = '';
    switch ($value[0])
    {
        case 's':
            if ($value[$length - 2] !== '"')
            {
                return false;
            }
        case 'b':
        case 'i':
        case 'd':
            // This looks odd but it is quicker than isset()ing
            $end .= ';';
        case 'a':
        case 'O':
            $end .= '}';
            if ($value[1] !== ':')
            {
                return false;
            }
            switch ($value[2])
            {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                default:
                    return false;
            }
        case 'N':
            $end .= ';';
            if ($value[$length - 1] !== $end[0])
            {
                return false;
            }
            break;
        default:
            return false;
    }
    if (($result = @unserialize($value)) === false)
    {
        $result = null;
        return false;
    }
    return true;
}

try {
    $dbh = new PDO("mysql:host={$database['host']};dbname={$database['dbname']}", $database['username'], $database['password']);

    $map = [
        'customer_eav_attribute' =>[
                'primary_key' => 'attribute_id',
                'fields' => ['validate_rules']
            ]
    ];


    foreach($map as $table => $meta){
        $primaryKey = $meta['primary_key'];
        $fields = $meta['fields'];

        $query = "SELECT * from {$table}";
        $appliedRows = 0;
        foreach($dbh->query($query) as $row){
            $primaryValue = $row[$primaryKey];
            $listToUpdate = [];
            foreach($fields as $field){
                $value = $row[$field];
                if($value == '') continue;
                if(!isSerialized($value)) continue;

                $value = unserialize($value, ['allowed_classes' => false]);
                $value = json_encode($value);

                $listToUpdate[] = "{$field}='{$value}'";
            }
            if(count($listToUpdate) == 0) continue;

            $listToUpdate = implode(",", $listToUpdate);
            $updateQuery = "UPDATE {$table} SET {$listToUpdate} WHERE {$primaryKey}='{$primaryValue}'";
            $result = $dbh->query($updateQuery);

            echo "Executed Query: {$updateQuery}" . PHP_EOL;
            $appliedRows++;
        }

        echo "Applied Rows: {$appliedRows}" . PHP_EOL;
    }

    echo 'Completed.'.PHP_EOL;
    $dbh = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
