#comandos
```shell
php -S localhost:8000 -t www/
```

ALTER TABLE `servico` ADD `cidade` VARCHAR(128) NULL DEFAULT NULL AFTER `fabricantes`;

CREATE FUNCTION returnCidade (cidadeId int(11))
RETURNS VARCHAR(128) DETERMINISTIC
RETURN (SELECT nome FROM cidade WHERE id = cidadeId);

ALTER TABLE `servico` ADD `estado` VARCHAR(128) NULL DEFAULT NULL AFTER `fabricantes`;

CREATE FUNCTION returnEstado (cidadeId int(11))
RETURNS VARCHAR(128) DETERMINISTIC
RETURN (SELECT estado.nome FROM estado,cidade WHERE estado.id=cidade.estado_id AND cidade.id = cidadeId);

UPDATE `servico` SET `cidade` = returnCidade(`servico`.`cidade_id`) WHERE `servico`.`cidade` IS NULL;

UPDATE `servico` SET `estado` = returnEstado(`servico`.`cidade_id`) WHERE `servico`.`estado` IS NULL;