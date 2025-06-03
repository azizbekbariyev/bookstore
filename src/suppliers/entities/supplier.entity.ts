import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Delivery } from "../../delivery/entities/delivery.entity";

@Entity('suppliers')
export class Suppliers {
    @ApiProperty({
        example: 1,
        description: "Unique identifier for the supplier",
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: "Book Supplier Inc.",
        description: "Name of the supplier",
    })
    @Column()
    name: string;

    @ApiProperty({
        example: "John Smith",
        description: "Contact person of the supplier",
    })
    @Column()
    contact_person: string;

    @ApiProperty({
        example: "+998901234567",
        description: "Phone number of the supplier",
    })
    @Column()
    phone: string;

    @ApiProperty({
        example: "supplier@example.com",
        description: "Email of the supplier",
    })
    @Column()
    email: string;

    @ApiProperty({
        example: "123 Supplier St",
        description: "Address of the supplier",
    })
    @Column()
    address: string;

    @OneToMany(() => Delivery, (delivery) => delivery.suppliers)
    delivery: Delivery[]
}