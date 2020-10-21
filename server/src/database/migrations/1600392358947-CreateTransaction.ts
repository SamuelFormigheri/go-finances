import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Transaction1598487511908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'db_transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: false
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
                        name: 'value',
                        type: 'numeric',
                        default: 0,
                        isNullable: false
                    },
                    { 
                        name: 'type',
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
        await queryRunner.createForeignKey('db_transactions', new TableForeignKey({
            name: 'TransactionCategory',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'db_categories',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
        await queryRunner.createForeignKey('db_transactions', new TableForeignKey({
            name: 'TransactionUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'db_users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('db_transactions', 'TransactionUser');
        await queryRunner.dropForeignKey('db_transactions', 'TransactionCategory');
        await queryRunner.dropTable('db_transactions');
    }

}
