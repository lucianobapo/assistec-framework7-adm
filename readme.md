#comandos
```shell
php -S localhost:8000 -t www/

ssh guiaassistenciat@216.172.172.178 -p2222 -i /home/luciano/.ssh/id_ed25519-cert  -o 'IdentitiesOnly yes'

rsync -rvztPhe "ssh guiaassistenciat@216.172.172.178 -p2222 -i /home/luciano/.ssh/id_ed25519-cert" .env.production testesdivertidos.com:/home/testesdivertidos/funny-joke/.env
```


ALTER TABLE `servico` ADD `cidade` VARCHAR(128) NULL DEFAULT NULL AFTER `fabricantes`;
ALTER TABLE `servico` ADD `estado` VARCHAR(128) NULL DEFAULT NULL AFTER `cidade`;
ALTER TABLE `servico` ADD `perfil` VARCHAR(50) NOT NULL DEFAULT 'gratuito' AFTER `estado`;
ALTER TABLE `servico` ADD `fotoCapa` VARCHAR(255) NULL AFTER `perfil`;
ALTER TABLE `servico` ADD `fotoLogo` VARCHAR(255) NULL AFTER `fotoCapa`;

ALTER TABLE `servico` ADD INDEX(`cidade`);
ALTER TABLE `servico` ADD INDEX(`estado`);

CREATE FUNCTION returnCidade (cidadeId int(11))
RETURNS VARCHAR(128) DETERMINISTIC
RETURN (SELECT nome FROM cidade WHERE id = cidadeId);

CREATE FUNCTION returnEstado (cidadeId int(11))
RETURNS VARCHAR(128) DETERMINISTIC
RETURN (SELECT estado.nome FROM estado,cidade WHERE estado.id=cidade.estado_id AND cidade.id = cidadeId);

UPDATE `servico` SET `cidade` = returnCidade(`servico`.`cidade_id`) WHERE `servico`.`cidade` IS NULL;

UPDATE `servico` SET `estado` = returnEstado(`servico`.`cidade_id`) WHERE `servico`.`estado` IS NULL;

