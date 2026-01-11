<?php
require 'vendor/autoload.php';
use App\Kernel;
$kernel = new Kernel('dev', true);
$kernel->boot();
$container = $kernel->getContainer();
$em = $container->get('doctrine.orm.entity_manager');
$fixture = new \App\DataFixtures\AppFixtures();
try {
    $fixture->load($em);
    file_put_contents('error_fixtures.txt', "SUCCESS");
} catch (\Throwable $e) {
    file_put_contents('error_fixtures.txt', "ERROR: " . $e->getMessage() . "\n" . $e->getTraceAsString());
}
