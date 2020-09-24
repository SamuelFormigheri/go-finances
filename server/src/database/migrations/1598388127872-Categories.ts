import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Categories1598488127872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'db_categories',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: false                      
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
        }));
        await queryRunner.createForeignKey('db_categories', new TableForeignKey({
            name: 'CategoryUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'db_users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('db_categories', 'CategoryUser');
        await queryRunner.dropTable('db_categories');
    }

}
